import { Typography, Row, Col, Empty, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import type { AppDispatch, RootState } from "../../../store";
import type { CartItem } from "../../../types/cart";
import { removeFromCart } from "../../../features/cart/cartSlice";
import PaymentCard from "../../../components/PaymentCard";
import FormPayment from "../../../components/FormPayment";
import { getAddressByUserId } from "../../../services/userService";
import type { Address } from "../../../types/address";
import type { Order } from "../../../types/order";
import { getListOrdersByUid, updatedOrder } from "../../../services/orderService";
import { addItemsToCartServer } from "../../../services/cartService";
import type { Voucher } from "../../../types/voucher";
import { useNavigate } from "react-router-dom";
const vouchers: Voucher[] = [
  {
    id: 1,
    code: "SUMMER50",
    description: "Giảm 50% tối đa 100k",
    discountPercent: 50,
    expireAt: "2025-08-30",
  },
  {
    id: 2,
    code: "FREESHIP",
    description: "Miễn phí vận chuyển cho đơn từ 200k",
    discountAmount: 25000,
    expireAt: "2025-09-15",
  },
  {
    id: 3,
    code: "WELCOME10",
    description: "Giảm 10% cho đơn đầu tiên",
    discountPercent: 10,
    expireAt: "2025-12-31",
  },
  {
    id: 3,
    code: "WELCOME10",
    description: "Giảm 10% cho đơn đầu tiên",
    discountPercent: 10,
    expireAt: "2025-12-31",
  },
  {
    id: 3,
    code: "WELCOME10",
    description: "Giảm 10% cho đơn đầu tiên",
    discountPercent: 10,
    expireAt: "2025-12-31",
  },
];
const PaymentPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const [orderItems, setOrderItems] = useState<Order[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentUrl, setPaymentUrl] = useState("");
  const userId: string = localStorage.getItem('userId') ?? '';
  const [addresses, setAddresses] = useState<Address[]>([]);
  const navigate = useNavigate();

  const selectedItems = useMemo(() => {
    return cartItems.filter(item => item.selected);
  }, [cartItems]);
  const unselectedItems = useMemo(() => {
  return cartItems.filter(item => !item.selected);
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
  // lấy thông tin địa chỉ
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAddressByUserId(userId);
        setAddresses(response);
        message.success("Đã tải địa chỉ thành công!");
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
        message.error("Không thể tải địa chỉ");
      }
    };
    fetchAddresses();
  }, [userId]);
  // lấy danh sách đơn hàng
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await getListOrdersByUid(userId);
          setOrderItems(response);
        } catch (error) {
          console.error("Failed to load orders", error);
        }
      }
      fetchOrders();
    }, [userId]);
  // cập nhật danh sách đơn hàng và giỏ hàng
  const handleCreateNewOrder = async (newOrder: Order) => {
    try {
      await updatedOrder(userId, [...orderItems, newOrder]);
      await addItemsToCartServer(userId, unselectedItems);
      selectedItems.forEach((item) => dispatch(removeFromCart(item.id)));
      navigate('/history')
      message.success("Đặt hành thành công.")
    } catch (error) {
      message.error('Đăt hàng thất bại vui lòng thử lại sau.')
      console.error("Lỗi tại payment page", error);
    }
  }
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
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            paymentUrl={paymentUrl}
            addresses={addresses}
            vouchers={vouchers}
            onCreateOrder={handleCreateNewOrder}
          />
        </Col>
      </Row>
    </>
  );
};

export default PaymentPage;
