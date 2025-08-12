/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { Card, Col, Row, Select, DatePicker, Space, Typography } from "antd";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import dayjs, { Dayjs } from "dayjs";
import StatisticCard from "../../../components/StatisticCard";

type Order = {
  id: string;
  date: string;
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

const { Option } = Select;
const { RangePicker } = DatePicker;

const AdminRevenuePage: React.FC = () => {
  const [filterType, setFilterType] = useState<"week" | "month" | "year" | "custom">("month");
  const [customRange, setCustomRange] = useState<[Dayjs, Dayjs] | null>(null);

  // ===== Lọc đơn hàng theo thời gian =====
  const filteredOrders = useMemo(() => {
    const today = dayjs();

    return orders.filter((o) => {
      const date = dayjs(o.date);

      if (filterType === "week") return date.isSame(today, "week");
      if (filterType === "month") return date.isSame(today, "month");
      if (filterType === "year") return date.isSame(today, "year");
      if (filterType === "custom" && customRange)
        return date.isAfter(customRange[0].startOf("day")) && date.isBefore(customRange[1].endOf("day"));
      return true;
    });
  }, [filterType, customRange]);

  // ===== Biểu đồ doanh thu theo tháng =====
  const revenueByMonth = useMemo(() => {
    const result: Record<string, number> = {};
    filteredOrders.forEach((order) => {
      const month = dayjs(order.date).format("MM/YYYY");
      result[month] = (result[month] || 0) + order.total;
    });
    return Object.entries(result)
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => dayjs(a.month, "MM/YYYY").unix() - dayjs(b.month, "MM/YYYY").unix());
  }, [filteredOrders]);

  return (
    <>
      <Typography.Title level={4}>Doanh thu</Typography.Title>
      <Row gutter={16}>
        <Col span={8}><StatisticCard title="Tổng doanh thu tuần" content="100000" /></Col>
        <Col span={8}><StatisticCard title="Tổng doanh thu tháng" content="10000000" /></Col>
        <Col span={8}><StatisticCard title="Tổng doanh năm" content="5555" /></Col>
      </Row>
     <Space align="center"  style={{ margin: "24px 0px" }}>
        <Typography.Title level={4} style={{ margin: "0px" }}>Thống kê doanh thu</Typography.Title>
        {/* Bộ lọc */}
        <Space>
          <Select value={filterType} onChange={(v) => setFilterType(v)} style={{ width: 150 }}>
            <Option value="week">Tuần này</Option>
            <Option value="month">Tháng này</Option>
            <Option value="year">Năm nay</Option>
            <Option value="custom">Tùy chọn</Option>
          </Select>
          {filterType === "custom" && (
            <RangePicker
              value={customRange as any}
              onChange={(v) => setCustomRange(v as [Dayjs, Dayjs])}
              format="YYYY-MM-DD"
            />
          )}
        </Space>
     </Space>


      <Card title="Biểu đồ tăng trưởng doanh thu">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={revenueByMonth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => value.toLocaleString("vi-VN") + " VND"} />
            <Line type="monotone" dataKey="total" stroke="#1890ff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

    </>
  );
};

export default AdminRevenuePage;
