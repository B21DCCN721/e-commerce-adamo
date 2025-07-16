import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Order {
  id: string;
  customer: string;
  date: string;
  status: "chờ xử lý" | "đang giao" | "đã giao" | "huỷ";
  total: number;
}

const data: Order[] = [
  { id: "DH001", customer: "Nguyễn Văn A", date: "2025-07-14", status: "chờ xử lý", total: 850000 },
  { id: "DH002", customer: "Trần Thị B", date: "2025-07-13", status: "đang giao", total: 420000 },
  { id: "DH003", customer: "Lê Văn C", date: "2025-07-12", status: "đã giao", total: 1210000 },
];

const statusColor = {
  "chờ xử lý": "orange",
  "đang giao": "blue",
  "đã giao": "green",
  "huỷ": "red",
};

const columns: ColumnsType<Order> = [
  {
    title: "Mã đơn",
    dataIndex: "id",
    render: (text) => <a href={`/admin/orders/${text}`}>{text}</a>,
  },
  { title: "Khách hàng", dataIndex: "customer" },
  { title: "Ngày đặt", dataIndex: "date" },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (status) => <Tag color={statusColor[status]}>{status.toUpperCase()}</Tag>,
  },
  {
    title: "Tổng tiền",
    dataIndex: "total",
    render: (val) => `${val.toLocaleString()} ₫`,
  },
];

export const RecentOrders = () => <Table columns={columns} dataSource={data} pagination={false} />;
