// pages/VoucherPage.tsx
import React, { useState, useMemo } from "react";
import { Row, Col, Typography, Input, Select } from "antd";
import VoucherCard from "../../../components/VoucherCard";
import { vouchers } from "./data";

const { Title } = Typography;
const { Option } = Select;

const VoucherPage: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<"all" | "percent" | "amount">(
    "all"
  );
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "expired">(
    "all"
  );
  const [search, setSearch] = useState("");

  const filteredVouchers = useMemo(() => {
    const now = new Date();
    return vouchers.filter((v) => {
      // Lọc theo loại
      if (typeFilter === "percent" && !v.discountPercent) return false;
      if (typeFilter === "amount" && !v.discountAmount) return false;

      // Lọc theo trạng thái
      const isExpired = new Date(v.expireAt) < now;
      if (statusFilter === "active" && isExpired) return false;
      if (statusFilter === "expired" && !isExpired) return false;

      // Lọc theo search
      if (search && !v.code.toLowerCase().includes(search.toLowerCase()))
        return false;

      return true;
    });
  }, [typeFilter, statusFilter, search]);

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <Title level={2} style={{ marginBottom: 16 }}>
        Danh sách Voucher
      </Title>

      {/* Bộ lọc */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <Input.Search
          placeholder="Tìm theo mã voucher..."
          allowClear
          style={{ maxWidth: 250 }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={typeFilter}
          style={{ width: 160 }}
          onChange={(value) => setTypeFilter(value)}
        >
          <Option value="all">Tất cả loại</Option>
          <Option value="percent">Giảm theo %</Option>
          <Option value="amount">Giảm theo số tiền</Option>
        </Select>

        <Select
          value={statusFilter}
          style={{ width: 160 }}
          onChange={(value) => setStatusFilter(value)}
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="active">Còn hạn</Option>
          <Option value="expired">Hết hạn</Option>
        </Select>
      </div>

      {/* Danh sách voucher */}
      <Row gutter={[16, 16]}>
        {filteredVouchers.map((voucher) => (
          <Col xs={24} sm={12} md={8} key={voucher.id}>
            <VoucherCard voucher={voucher} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VoucherPage;
