/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { Card, Col, Row, Select, DatePicker, Space, Typography } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label
} from "recharts";
import dayjs, { Dayjs } from "dayjs";
import StatisticCard from "../../../components/StatisticCard";
import { orders } from "./data";

const { Option } = Select;
const { RangePicker } = DatePicker;

const currencyFormatter = (value: number) =>
  value.toLocaleString("vi-VN") + " ₫";

const AdminRevenuePage: React.FC = () => {
  const [filterType, setFilterType] = useState<
    "week" | "month" | "year" | "custom"
  >("month");
  const [customRange, setCustomRange] = useState<[Dayjs, Dayjs] | null>(null);

  // Lọc dữ liệu theo bộ lọc
  const filteredOrders = useMemo(() => {
    const today = dayjs();
    return orders.filter((o) => {
      const date = dayjs(o.date);
      if (filterType === "week") return date.isSame(today, "week");
      if (filterType === "month") return date.isSame(today, "month");
      if (filterType === "year") return date.isSame(today, "year");
      if (filterType === "custom" && customRange)
        return (
          date.isAfter(customRange[0].startOf("day")) &&
          date.isBefore(customRange[1].endOf("day"))
        );
      return true;
    });
  }, [filterType, customRange]);

  // Tổng doanh thu
  const totalWeek = useMemo(
    () =>
      orders
        .filter((o) => dayjs(o.date).isSame(dayjs(), "week"))
        .reduce((sum, o) => sum + o.total, 0),
    []
  );

  const totalMonth = useMemo(
    () =>
      orders
        .filter((o) => dayjs(o.date).isSame(dayjs(), "month"))
        .reduce((sum, o) => sum + o.total, 0),
    []
  );

  const totalYear = useMemo(
    () =>
      orders
        .filter((o) => dayjs(o.date).isSame(dayjs(), "year"))
        .reduce((sum, o) => sum + o.total, 0),
    []
  );

  const chartData = useMemo(() => {
    const result: Record<string, number> = {};

    filteredOrders.forEach((order) => {
      let key: string;

      if (filterType === "year") {
        key = dayjs(order.date).format("MM/YYYY"); // nhóm theo tháng
      } else {
        key = dayjs(order.date).format("DD/MM"); // nhóm theo ngày
      }

      result[key] = (result[key] || 0) + order.total;
    });

    return Object.entries(result)
      .map(([label, total]) => ({ label, total }))
      .sort((a, b) => {
        return filterType === "year"
          ? dayjs(a.label, "MM/YYYY").unix() - dayjs(b.label, "MM/YYYY").unix()
          : dayjs(a.label, "DD/MM").unix() - dayjs(b.label, "DD/MM").unix();
      });
  }, [filteredOrders, filterType]);


  return (
    <>
      <Typography.Title level={4}>Doanh thu</Typography.Title>
      <Row gutter={16}>
        <Col span={8}>
          <StatisticCard
            title="Tổng doanh thu tuần"
            content={currencyFormatter(totalWeek)}
          />
        </Col>
        <Col span={8}>
          <StatisticCard
            title="Tổng doanh thu tháng"
            content={currencyFormatter(totalMonth)}
          />
        </Col>
        <Col span={8}>
          <StatisticCard
            title="Tổng doanh thu năm"
            content={currencyFormatter(totalYear)}
          />
        </Col>
      </Row>

      <Space align="center" style={{ margin: "24px 0px" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Thống kê doanh thu
        </Typography.Title>
        <Space>
          <Select
            value={filterType}
            onChange={(v) => setFilterType(v)}
            style={{ width: 150 }}
          >
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
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="label">
              <Label
                value={filterType === "year" ? "Tháng/Năm" : "Ngày/Tháng"}
                offset={0}
                position="insideBottom"
                dy={20}
              />
            </XAxis>

            <YAxis
              tickFormatter={(val) => `${(val / 1_000_000).toFixed(1)}M`}
            >
              <Label
                value="Doanh thu (VND)"
                angle={-90}
                position="insideLeft"
                dx={-30} // cách trục một đoạn
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip formatter={(value: number) => currencyFormatter(value)} />
            <Line
              type="monotone"
              dataKey="total"
              name="Doanh thu"
              stroke="#1890ff"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default AdminRevenuePage;
