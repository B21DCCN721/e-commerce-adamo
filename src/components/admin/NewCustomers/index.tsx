import { Table } from "antd";

interface Customer {
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  orders: number;
}

const data: Customer[] = [
  { name: "Phạm Quỳnh", email: "quynh@gmail.com", phone: "0901234567", registeredAt: "2025-07-14", orders: 1 },
  { name: "Lê Trung", email: "trung@gmail.com", phone: "0934567890", registeredAt: "2025-07-13", orders: 2 },
];

const columns = [
  { title: "Tên", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "SĐT", dataIndex: "phone" },
  { title: "Ngày đăng ký", dataIndex: "registeredAt" },
  { title: "Số đơn đã mua", dataIndex: "orders" },
];

export const NewCustomers = () => <Table columns={columns} dataSource={data} pagination={false} />;
