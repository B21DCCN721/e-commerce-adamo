import { Typography, Space, Modal, Button, } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";
import type { AppDispatch, RootState } from "../../store";
import CartTable from "../../components/CartTable";
import type { CartItem } from "../../types/cart";


const CartPage = () => {
  const listProducts: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const handleClearCart = () => {
    Modal.confirm({
      title: 'Bạn có chắc muốn xóa?',
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        dispatch(clearCart())
      },
    });
  }
  return (
    <>
      <Space align="center" size="middle">
        <Typography.Title level={3}>
          Danh sách sản phẩm trong giỏ hàng
        </Typography.Title>
        <Button onClick={handleClearCart} danger disabled={listProducts.length === 0}>
          Xóa toàn bộ
        </Button>
      </Space>
      <CartTable items={listProducts} />
    </>
  );
};

export default CartPage;
