import { Typography, Space, Modal, Button, Flex, Spin, Divider, } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setCart } from "../../../features/cart/cartSlice";
import type { AppDispatch, RootState } from "../../../store";
import CartTable from "../../../components/CartTable";
import type { CartItem } from "../../../types/cart";
import { useCallback, useEffect, useRef, useState } from "react";
import { addItemsToCartServer, getCartByUserId } from "../../../services/cartService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "../../../components/ProductCard";
import { getListProductWithVariants } from "../../../services/productService";
import type { ProductWithVariants } from "../../../types/product";

const CartPage = () => {
  const listLocalProducts: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId') ?? '';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const dispatch = useDispatch<AppDispatch>();
  const firstRender = useRef(true);
  const [recommendProducts, setRecommendProducts] = useState<ProductWithVariants[]>([]);
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
  // sản phẩm đề xuất
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const data = await getListProductWithVariants();
          setRecommendProducts(data);
        } catch (error) {
          console.error("Failed to load products", error);
        }
      };
      fetchProducts();
    }, []);
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
      {isAuthenticated && (
        <>
        <Typography.Title level={3}>
            CÓ THỂ BẠN CŨNG THÍCH
        </Typography.Title>
        <div>
          <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={10}
                  slidesPerView='auto'
                  // centeredSlides={true}
                  navigation
                // pagination={{ clickable: true }}
                >
                  {recommendProducts.map((item, i) => (
                    <SwiperSlide key={i} style={{ width: "280px" }}>
                      <ProductCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      category={item.category}
                      price={item.price}
                      oldPrice={item.oldPrice}
                      image={item.image}
                      inStock={true}
                      rating={item.rating}
                      tags={item.tags}
                    />
                    </SwiperSlide>
                  ))}
                </Swiper>
        </div>
      </>
      )}
    </>
  );
};

export default CartPage;
