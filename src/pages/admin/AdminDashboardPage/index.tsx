import {
  Card,
  Row,
  Col,
  Table,
  Tag,
  Statistic,
  Typography,
} from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const AdminDashboardPage = () => {
  const stats = [
    { title: "Doanh thu tháng", value: 12340000, color: "green", icon: <DollarOutlined /> },
    { title: "Đơn hàng mới", value: 320, color: "blue", icon: <ShoppingCartOutlined /> },
    { title: "Khách hàng", value: 1200, color: "purple", icon: <UserOutlined /> },
    { title: "Sản phẩm", value: 540, color: "orange", icon: <AppstoreOutlined /> },
  ];

  const chartData = [
    { month: "Jan", revenue: 4000000 },
    { month: "Feb", revenue: 3000000 },
    { month: "Mar", revenue: 5000000 },
    { month: "Apr", revenue: 7000000 },
    { month: "May", revenue: 6000000 },
    { month: "Jun", revenue: 8000000 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: "#fff", border: "1px solid #ccc", padding: 10 }}>
          <p><strong>Tháng:</strong> {label}</p>
          <p><strong>Doanh thu:</strong> {payload[0].value.toLocaleString("vi-VN")} VND</p>
        </div>
      );
    }
    return null;
  };

  const columns = [
    { title: "Mã đơn", dataIndex: "orderId", key: "orderId" },
    { title: "Khách hàng", dataIndex: "customer", key: "customer" },
    { title: "Ngày", dataIndex: "date", key: "date" },
    { title: "Tổng tiền", dataIndex: "total", key: "total" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "Đã giao" ? "green" : status === "Đang giao" ? "blue" : "red";
        return <Tag color={color} style={{ fontWeight: "bold" }}>{status}</Tag>;
      },
    },
  ];

  const data = [
    { orderId: "#1001", customer: "Nguyễn Văn A", date: "2025-08-01", total: "120.000₫", status: "Đang giao" },
    { orderId: "#1002", customer: "Trần Thị B", date: "2025-08-02", total: "240.000₫", status: "Đã giao" },
    { orderId: "#1003", customer: "Lê Văn C", date: "2025-08-03", total: "180.000₫", status: "Đang giao" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ marginBottom: 24 }}>Tổng quan</Title>

      {/* Thống kê */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {stats.map((item) => (
          <Col xs={24} sm={12} md={6} key={item.title}>
            <Card>
              <Statistic
                title={<span style={{ color: "#888" }}>{item.title}</span>}
                value={item.value}
                valueStyle={{ color: item.color }}
                prefix={item.icon}
                formatter={value =>
                  typeof value === "number"
                    ? value.toLocaleString("vi-VN")
                    : value
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Biểu đồ */}
      <Card title="Doanh thu 6 tháng gần đây" style={{ marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `${v / 1000000}tr`} />
            <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Bảng đơn hàng */}
      <Card title="Đơn hàng gần đây">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="orderId"
        />
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
