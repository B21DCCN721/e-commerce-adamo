import { Typography, Row, Col, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import type { AppDispatch, RootState } from "../../store";
import type { CartItem } from "../../types/cart";
import { removeFromCart } from "../../features/cart/cartSlice";
import PaymentCard from "../../components/PaymentCard";
import FormPayment from "../../components/FormPayment";

const PaymentPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentUrl, setPaymentUrl] = useState("");

  const selectedItems = useMemo(() => {
    return cartItems.filter(item => item.selected);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [selectedItems]);
  useEffect(() => {
    if (paymentMethod === 'banking') {
      const fakeUrl = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?amount=${totalPrice}`;
      setPaymentUrl(fakeUrl);
    } else {
      setPaymentUrl(""); // Xóa URL khi chọn lại thanh toán COD
    }
  }, [paymentMethod, totalPrice]);

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
          <FormPayment
            selectedItems={selectedItems}
            totalPrice={totalPrice}
            onSuccess={handleSuccessfulPayment}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            paymentUrl={paymentUrl}
          />
        </Col>
      </Row>
    </>
  );
};

export default PaymentPage;
