import { Typography, Space, Modal, Button, Flex, Spin, Divider, } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setCart } from "../../../features/cart/cartSlice";
import type { AppDispatch, RootState } from "../../../store";
import CartTable from "../../../components/CartTable";
import type { CartItem } from "../../../types/cart";
import { useCallback, useEffect, useRef, useState } from "react";
import { addItemsToCartServer, getCartByUserId } from "../../../services/cartService";


const CartPage = () => {
  const listLocalProducts: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId') ?? '';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const dispatch = useDispatch<AppDispatch>();
  const firstRender = useRef(true);
  const handleClearCart = useCallback(() => {
    Modal.confirm({
      title: 'Bạn có chắc muốn xóa?',
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        if (isAuthenticated) {
          try {
            await addItemsToCartServer(userId, [])
            dispatch(clearCart())
          } catch (error) {
            console.error('Lỗi xóa giỏ hàng server', error)
          }
        } else {
          dispatch(clearCart())
        }
      },
    });
  }, [dispatch, isAuthenticated, userId])
  // lấy giỏ hàng từ server
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await getCartByUserId(userId);
        dispatch(setCart(response))
      } catch (error) {
        console.log('Failed to fecth cart item ', error);
      } finally {
        setLoading(false);
      }
    }
    if(isAuthenticated){
      fetchCartItems();
    }
  }, [userId, handleClearCart, dispatch, isAuthenticated]);
  // cập nhật giỏ hàng
  useEffect(() => {
    const syncCart = async () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (isAuthenticated) {
        try {
          await addItemsToCartServer(userId, listLocalProducts);
        } catch (error) {
          console.error('Failed to update cart', error);
        }
      }
    };
  
    syncCart();
  }, [listLocalProducts, isAuthenticated, userId]);
  if (loading) {
    return <Flex justify="center"><Spin size="large" /></Flex>
  }
  return (
    <>
      <Space align="center" size="middle">
        <Typography.Title level={3}>
          Danh sách sản phẩm trong giỏ hàng
        </Typography.Title>
        <Button onClick={handleClearCart} color="danger" variant="solid" disabled={listLocalProducts.length === 0}>
          Xóa toàn bộ
        </Button>
      </Space>
      <CartTable items={listLocalProducts} />
      <Divider/>
      <Typography.Title level={3}>
          Có thể bạn cũng thích
        </Typography.Title>
    </>
  );
};

export default CartPage;
