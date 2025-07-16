import { Table } from "antd";

interface Delivery {
  id: string;
  customer: string;
  deliveryDate: string;
  shippingProvider: string;
}

const data: Delivery[] = [
  { id: "DH002", customer: "Trần Thị B", deliveryDate: "2025-07-16", shippingProvider: "Giao Hàng Nhanh" },
  { id: "DH004", customer: "Phạm Văn D", deliveryDate: "2025-07-17", shippingProvider: "J&T Express" },
];

const columns = [
  { title: "Mã đơn", dataIndex: "id" },
  { title: "Khách hàng", dataIndex: "customer" },
  { title: "Ngày giao dự kiến", dataIndex: "deliveryDate" },
  { title: "Đơn vị vận chuyển", dataIndex: "shippingProvider" },
];

export const ShippingSchedule = () => <Table columns={columns} dataSource={data} pagination={false} />;
