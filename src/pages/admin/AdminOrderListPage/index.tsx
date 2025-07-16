import React, { useState } from "react";
import { Empty, Input, Select, Space } from "antd";

import type { Order, } from "../../../types/order"; // adjust path
import AdminOrderCard from "../../../components/admin/AdminOrderCard";

// Giả lập dữ liệu đơn hàng
const orders: Order[] = [
  {
    id: 101,
    customerId: 1,
    customerPhone: "0901234567",
    customerAddress: "123 Lê Lợi, Quận 1, TP.HCM",
    status: "pending",
    isPaid: false,
    totalAmount: 750000,
    deliverySuccessAt: undefined,
    paymentMethod: "COD",
    items: [
      {
        productId: 1,
        productName: "Áo thun trắng",
        productImage: "https://via.placeholder.com/80",
        productCategory: "Áo",
        quantity: 2,
        price: 150000,
      },
      {
        productId: 2,
        productName: "Quần jean",
        productImage: "https://via.placeholder.com/80",
        productCategory: "Quần",
        quantity: 1,
        price: 450000,
      },
    ],
  },
];


const AdminOrderListPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("all");
  const filterDatas = orders.filter((order) => {
    const matchSearch = order.id.toString().includes(searchText);
    const matchStatus = status === "all" || order.status === status;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <Space style={{ width: "100%", marginBottom: "8px" }}>
        <Select
          style={{ width: "150px" }}
          value={status}
          onChange={(value) => setStatus(value)}
          options={[
            { value: 'all', label: 'Tất cả' },
            { value: 'pending', label: 'Đang xử lý' },
            { value: 'shipping', label: 'Đang vận chuyển' },
            { value: 'delivered', label: 'Đã giao' },
            { value: 'canceled', label: 'Đã hủy' },
          ]}
        />

        <Input.Search
          placeholder="Tìm theo mã đơn hàng"
          allowClear
          enterButton
          style={{ width: 300 }}
          onSearch={setSearchText}
        />
      </Space>

      <Space direction="vertical" style={{ width: "100%" }}>
        {filterDatas.length !== 0 ? (filterDatas.map((order) => (
          <AdminOrderCard order={order} />
        ))) : <Empty />}
      </Space>
    </>
  );
};

export default AdminOrderListPage;
