import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

// ==== DỮ LIỆU GIẢ ====
type Order = {
  id: string;
  date: string; // ISO string
  total: number;
  paymentMethod: "cash" | "banking";
};

const orders: Order[] = [
  { id: "1", date: "2025-08-01", total: 1200000, paymentMethod: "cash" },
  { id: "2", date: "2025-08-02", total: 800000, paymentMethod: "banking" },
  { id: "3", date: "2025-08-02", total: 600000, paymentMethod: "cash" },
  { id: "4", date: "2025-07-15", total: 2000000, paymentMethod: "banking" },
  { id: "5", date: "2025-07-20", total: 500000, paymentMethod: "cash" },
  { id: "6", date: "2025-01-10", total: 300000, paymentMethod: "cash" },
  { id: "7", date: "2025-06-10", total: 1500000, paymentMethod: "banking" },
  { id: "8", date: "2025-06-20", total: 800000, paymentMethod: "cash" },
];

// ==== TÍNH DOANH THU ====
const today = dayjs();
const currentMonth = today.format("YYYY-MM");
const currentYear = today.format("YYYY");

const dailyRevenue = orders
  .filter((o) => dayjs(o.date).isSame(today, "day"))
  .reduce((sum, o) => sum + o.total, 0);

const monthlyRevenue = orders
  .filter((o) => dayjs(o.date).format("YYYY-MM") === currentMonth)
  .reduce((sum, o) => sum + o.total, 0);

const yearlyRevenue = orders
  .filter((o) => dayjs(o.date).format("YYYY") === currentYear)
  .reduce((sum, o) => sum + o.total, 0);

const revenueByPayment = orders.reduce((acc, order) => {
  acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + order.total;
  return acc;
}, {} as Record<string, number>);

// ==== BIỂU ĐỒ TĂNG TRƯỞNG ====
const getMonthlyRevenue = () => {
  const result: Record<string, number> = {};

  orders.forEach((order) => {
    const month = dayjs(order.date).format("MM/YYYY");
    result[month] = (result[month] || 0) + order.total;
  });

  return Object.entries(result)
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => dayjs(a.month, "MM/YYYY").unix() - dayjs(b.month, "MM/YYYY").unix());
};

const revenueByMonth = getMonthlyRevenue();

// ==== COMPONENT ====
const AdminRevenuePage: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24 }}>Thống kê doanh thu</h2>

      {/* Tổng quan doanh thu */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Doanh thu hôm nay"
              value={dailyRevenue}
              valueStyle={{ color: "#52c41a" }}
              suffix="VND"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Doanh thu tháng này"
              value={monthlyRevenue}
              valueStyle={{ color: "#1890ff" }}
              suffix="VND"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Doanh thu năm nay"
              value={yearlyRevenue}
              valueStyle={{ color: "#722ed1" }}
              suffix="VND"
            />
          </Card>
        </Col>
      </Row>

      {/* Doanh thu theo phương thức thanh toán */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="Doanh thu theo phương thức thanh toán">
            <p>💵 Tiền mặt: {revenueByPayment["cash"]?.toLocaleString("vi-VN") || 0} VND</p>
            <p>🏦 Chuyển khoản: {revenueByPayment["banking"]?.toLocaleString("vi-VN") || 0} VND</p>
          </Card>
        </Col>

        {/* Biểu đồ tăng trưởng */}
        <Col span={12}>
          <Card title="Biểu đồ tăng trưởng doanh thu theo tháng">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueByMonth}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => value.toLocaleString("vi-VN") + " VND"} />
                <Line type="monotone" dataKey="total" stroke="#1890ff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminRevenuePage;
