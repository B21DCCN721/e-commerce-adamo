import { Card, Row, Col, Table, Tag } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboardPage = () => {
  const stats = [
    { title: "Doanh thu tháng", value: "$12,340", color: "green" },
    { title: "Đơn hàng mới", value: "320", color: "blue" },
    { title: "Khách hàng", value: "1,200", color: "purple" },
    { title: "Sản phẩm", value: "540", color: "orange" },
  ];

  const chartData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 7000 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 8000 },
  ];

  const columns = [
    { title: "Mã đơn", dataIndex: "orderId", key: "orderId" },
    { title: "Khách hàng", dataIndex: "customer", key: "customer" },
    { title: "Ngày", dataIndex: "date", key: "date" },
    { title: "Tổng tiền", dataIndex: "total", key: "total" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Đã giao" ? "green" : "blue"}>{status}</Tag>
      ),
    },
  ];

  const data = [
    { orderId: "#1001", customer: "Nguyễn Văn A", date: "2025-08-01", total: "$120", status: "Đang giao" },
    { orderId: "#1002", customer: "Trần Thị B", date: "2025-08-02", total: "$240", status: "Đã giao" },
    { orderId: "#1003", customer: "Lê Văn C", date: "2025-08-03", total: "$180", status: "Đang giao" },
  ];

  return (
    <div>
      {/* Thống kê */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {stats.map((item) => (
          <Col xs={24} sm={12} md={6} key={item.title}>
            <Card>
              <div style={{ color: "#888" }}>{item.title}</div>
              <div style={{ fontSize: 24, fontWeight: "bold", color: item.color }}>{item.value}</div>
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
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Bảng đơn hàng */}
      <Card title="Đơn hàng gần đây">
        <Table columns={columns} dataSource={data} pagination={false} rowKey="orderId" />
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
