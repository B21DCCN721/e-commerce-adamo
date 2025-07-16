import { Table, Button, Tag } from "antd";

interface Product {
  id: string;
  name: string;
  stock: number;
}

const data: Product[] = [
  { id: "SP01", name: "Áo thun trắng", stock: 3 },
  { id: "SP02", name: "Quần jeans đen", stock: 2 },
];

const columns = [
  { title: "Mã sản phẩm", dataIndex: "id" },
  { title: "Tên sản phẩm", dataIndex: "name" },
  {
    title: "Tồn kho",
    dataIndex: "stock",
    render: (val: number) => <Tag color={val < 3 ? "red" : "orange"}>{val} cái</Tag>,
  },
  {
    title: "",
    render: () => <Button type="link">Nhập thêm</Button>,
  },
];

export const LowStockProducts = () => (
  <Table columns={columns} dataSource={data} pagination={false} />
);
