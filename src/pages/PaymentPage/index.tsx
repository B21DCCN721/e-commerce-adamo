import { Typography, Row, Col, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import type { AppDispatch, RootState } from "../../store";
import type { CartItem } from "../../schemas/cart";
import { removeFromCart } from "../../features/cart/cartSlice";
import PaymentCard from "../../components/PaymentCard";
import PaymentForm from "../../components/PaymentForm";

const PaymentPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);

  const selectedItems = useMemo(() => {
    return cartItems.filter(item => item.selected);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [selectedItems]);

  const handleSuccessfulPayment = () => {
    selectedItems.forEach((item) => dispatch(removeFromCart(item.id)));
  };

  return (
    <>
      <Typography.Title level={3}>Thanh toán đơn hàng</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          {selectedItems.length > 0 ? (
            <PaymentCard items={selectedItems} />
          ) : (
            <Empty description="Không có sản phẩm nào được chọn" />
          )}
        </Col>
        <Col xs={24} md={8}>
          <PaymentForm
            selectedItems={selectedItems}
            totalPrice={totalPrice}
            onSuccess={handleSuccessfulPayment}
          />
        </Col>
      </Row>
    </>
  );
};

export default PaymentPage;
