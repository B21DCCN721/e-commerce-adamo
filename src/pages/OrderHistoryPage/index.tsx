import { Space, Segmented, Empty } from "antd";
import type { Order } from "../../schemas/order";
import OrderCard from "../../components/OrderCard";
import { useState } from "react";

const orders: Order[] = [
  {
    id: 1,
    customerId:1,
    paymentMethod: 'cash',
    customerPhone:"0123456789",
    customerAddress: "Yên phương-Yên Lạc-Vĩnh Phúc",
    status: "delivered",
    statusLabel: "HOÀN THÀNH",
    deliverySuccessAt: "Giao hàng thành công",
    totalAmount: 55000,
    items: [
      {
        id: 1,
        productName: "Áo thể thao",
        productImage: "https://picsum.photos/id/101/300/200",
        productCategory: "Áo",
        quantity: 1,
        price: 55000,
        originalPrice: 99000,
      },
    ],
  },
  {
    id: 2,
    customerId:1,
    paymentMethod: 'cash',
    customerPhone:"0123456789",
    customerAddress: "Yên phương-Yên Lạc-Vĩnh Phúc",
    status: "canceled",
    statusLabel: "HỦY ĐƠN",
    deliverySuccessAt: "Giao hàng thành công",
    totalAmount: 55000,
    items: [
      {
        id: 1,
        productName: "Áo thể thao",
        productImage: "https://picsum.photos/id/101/300/200",
        productCategory: "Áo",
        quantity: 1,
        price: 55000,
        originalPrice: 99000,
      },
    ],
  },
  {
    id: 3,
    customerId:1,
    paymentMethod: 'cash',
    customerPhone:"0123456789",
    customerAddress: "Yên phương-Yên Lạc-Vĩnh Phúc",
    status: "pending",
    statusLabel: "Đợi xác nhận",
    deliverySuccessAt: "Giao hàng thành công",
    totalAmount: 55000,
    items: [
      {
        id: 1,
        productName: "Áo thể thao",
        productImage: "https://picsum.photos/id/101/300/200",
        productCategory: "Áo",
        quantity: 1,
        price: 55000,
        originalPrice: 99000,
      },
    ],
  },
];

const OrderHistoryPage = () => {
  const statusMap: Record<string, string | null> = {
    "Tất cả": null,
    "Đang xử lý": "pending",
    "Đang vận chuyển": "shipping",
    "Đã giao": "delivered",
    "Đã hủy": "canceled"
  };
  const [selectedStatus, setSelectedStatus] = useState<string>("Tất cả");

  const filteredOrders = orders.filter((order) => {
    const statusFilter = statusMap[selectedStatus];
    return statusFilter ? order.status === statusFilter : true;
  });
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Segmented
        options={["Tất cả", "Đang xử lý", "Đang vận chuyển", "Đã giao", "Đã hủy"]}
        defaultValue="Tất cả"
        onChange={(value) => setSelectedStatus(value as string)}
      />
      <div>
        {filteredOrders?.length ? (filteredOrders.map((order) => (
          <OrderCard order={order} />
        ))) : (<Empty />)}
      </div>
    </Space>
  );
}
export default OrderHistoryPage;
