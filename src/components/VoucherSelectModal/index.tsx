import React, { useState, useMemo } from "react";
import { Modal, Row, Col, Input, Select, Empty, Button } from "antd";
import type { Voucher } from "../../types/voucher";
import VoucherCard from "../VoucherCard";

const { Option } = Select;

interface VoucherSelectModalProps {
  open: boolean;
  vouchers: Voucher[];
  onSelect: (voucher: Voucher | null) => void;
  onClose: () => void;
}

const VoucherSelectModal: React.FC<VoucherSelectModalProps> = ({
  open,
  vouchers,
  onSelect,
  onClose,
}) => {
  const [typeFilter, setTypeFilter] = useState<"all" | "percent" | "amount">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "expired">("all");
  const [search, setSearch] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const filteredVouchers = useMemo(() => {
    const now = new Date();
    return vouchers.filter((v) => {
      // Filter type
      if (typeFilter === "percent" && !v.discountPercent) return false;
      if (typeFilter === "amount" && !v.discountAmount) return false;

      // Filter status
      const isExpired = new Date(v.expireAt) < now;
      if (statusFilter === "active" && isExpired) return false;
      if (statusFilter === "expired" && !isExpired) return false;

      // Filter search
      if (search && !v.code.toLowerCase().includes(search.toLowerCase())) return false;

      return true;
    });
  }, [vouchers, typeFilter, statusFilter, search]);

  const handleApply = () => {
    onSelect(selectedVoucher);
    onClose();
  };

  return (
    <Modal
      title="Chọn Voucher"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="apply"
          type="primary"
          disabled={!selectedVoucher}
          onClick={handleApply}
        >
          Áp dụng
        </Button>,
      ]}
      width={800}
    >
      {/* Bộ lọc */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
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
      <div
        style={{
          maxHeight: 400,      
          overflowY: "auto",   
          overflowX: "hidden", 
          paddingRight: 4, 
        }}
      >
        {filteredVouchers.length === 0 ? (
          <Empty description="Không có voucher phù hợp" />
        ) : (
          <Row gutter={[16, 16]}>
            {filteredVouchers.map((voucher) => (
              <Col span={24} key={voucher.id}>
                <VoucherCard
                  voucher={voucher}
                  selected={selectedVoucher?.id === voucher.id}
                  onClick={() =>
                    setSelectedVoucher((prev) =>
                      prev?.id === voucher.id ? null : voucher
                    )
                  }
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Modal>
  );
};

export default VoucherSelectModal;
