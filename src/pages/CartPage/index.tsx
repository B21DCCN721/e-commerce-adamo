import { Typography, Space, } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";
import type { AppDispatch, RootState } from "../../store";
import ModalConfirm from "../../components/ModalConfirm";
import CartTable from "../../components/CartTable";
import type { CartItem } from "../../types/cart";


const CartPage = () => {
  const listProducts: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  // const handleClearCart = () => {
  //   Modal.confirm({
  //     title: 'Bạn có chắc muốn xóa?',
  //     content: 'Hành động này không thể hoàn tác.',
  //     okText: 'Xác nhận',
  //     okType: 'danger',
  //     cancelText: 'Hủy',
  //     onOk() {
  //       console.log('Đã xác nhận');
  //       dispatch(clearCart())
  //     },
  //     onCancel() {
  //       console.log('Đã hủy');
  //     },
  //   });
  // }
  return (
    <>
      <Space align="center" size="middle">
        <Typography.Title level={3}>
          Danh sách sản phẩm trong giỏ hàng
        </Typography.Title>
        <ModalConfirm btnTitle="Xóa toàn bộ" modalTitle="Xác nhận xóa" content="Hành động này không thể hoàn tác." disabled={listProducts.length === 0}
          onOk={() => {
            dispatch(clearCart());
          }}
        />
      </Space>
      <CartTable items={listProducts} />
    </>
  );
};

export default CartPage;
