import { Space, Segmented, Empty } from "antd";
import type { Order } from "../../types/order";
import OrderCard from "../../components/OrderCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { changeStatus } from "../../features/order/orderSlice";

// const orders: Order[] = [
//   {
//     id: 1,
//     customerId:1,
//     paymentMethod: 'cash',
//     customerPhone:"0123456789",
//     customerAddress: "Yên phương-Yên Lạc-Vĩnh Phúc",
//     status: "delivered",
//     statusLabel: "HOÀN THÀNH",
//     isPaid: true,
//     deliverySuccessAt: "Giao hàng thành công",
//     totalAmount: 55000,
//     items: [
//       {
//         id: 1,
//         productName: "Áo thể thao",
//         productImage: "https://picsum.photos/id/101/300/200",
//         productCategory: "Áo",
//         quantity: 1,
//         price: 55000,
//         oldPrice: 99000,
//       },
//     ],
//   },
//   {
//     id: 2,
//     customerId:1,
//     paymentMethod: 'cash',
//     customerPhone:"0123456789",
//     customerAddress: "Yên phương-Yên Lạc-Vĩnh Phúc",
//     status: "canceled",
//     statusLabel: "HỦY ĐƠN",
//     isPaid: false,
//     deliverySuccessAt: "Giao hàng thành công",
//     totalAmount: 55000,
//     items: [
//       {
//         id: 1,
//         productName: "Áo thể thao",
//         productImage: "https://picsum.photos/id/101/300/200",
//         productCategory: "Áo",
//         quantity: 1,
//         price: 55000,
//         oldPrice: 99000,
//       },
//     ],
//   },
//   {
//     id: 3,
//     customerId:1,
//     paymentMethod: 'cash',
//     customerPhone:"0123456789",
//     customerAddress: "Yên phương-Yên Lạc-Vĩnh Phúc",
//     status: "pending",
//     statusLabel: "Đợi xác nhận",
//     isPaid: false,
//     deliverySuccessAt: "Giao hàng thành công",
//     totalAmount: 55000,
//     items: [
//       {
//         id: 1,
//         productName: "Áo thể thao",
//         productImage: "https://picsum.photos/id/101/300/200",
//         productCategory: "Áo",
//         quantity: 1,
//         price: 55000,
//         oldPrice: 99000,
//       },
//       {
//         id: 2,
//         productName: "Áo thể thao",
//         productImage: "https://picsum.photos/id/101/300/200",
//         productCategory: "Áo",
//         quantity: 1,
//         price: 55000,
//         oldPrice: 99000,
//       },
//       {
//         id: 3,
//         productName: "Áo thể thao",
//         productImage: "https://picsum.photos/id/101/300/200",
//         productCategory: "Áo",
//         quantity: 1,
//         price: 55000,
//         oldPrice: 99000,
//       },
//     ],
//   },
// ];

const OrderHistoryPage = () => {
  const statusMap: Record<string, string | null> = {
    "Tất cả": null,
    "Đang xử lý": "pending",
    "Đã xác nhận": "confirmed",
    "Đang vận chuyển": "shipped",
    "Đã giao": "delivered",
    "Đã hủy": "canceled"
  };
  const [selectedStatus, setSelectedStatus] = useState<string>("Tất cả");
  const orders: Order[] = useSelector((state: RootState) => state.order.items);
  const filteredOrders = orders.filter((order) => {
    const statusFilter = statusMap[selectedStatus];
    return statusFilter ? order.status === statusFilter : true;
  });
  const dispatch = useDispatch<AppDispatch>();
  const handleCanceled = (id: number) => {
    return dispatch(changeStatus({ id, status: "canceled" }));
  }
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Segmented
        options={["Tất cả", "Đang xử lý", "Đã xác nhận", "Đang vận chuyển", "Đã giao", "Đã hủy"]}
        defaultValue="Tất cả"
        onChange={(value) => setSelectedStatus(value as string)}
      />
      <div>
        {filteredOrders?.length ? (filteredOrders.map((order) => (
          <OrderCard order={order} handleCanceled={() => handleCanceled(order.id)} submitReview={(data) => console.log("Đánh giá:", data)} />
        ))) : (<Empty />)}
      </div>
    </Space>
  );
}
export default OrderHistoryPage;
