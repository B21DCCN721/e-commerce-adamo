// pages/VoucherPage.tsx
import React, { useState } from "react";
import { Row, Col, Alert, Typography } from "antd";
import VoucherCard from "../../components/VoucherCard";
import type { Voucher } from "../../types/voucher";

const { Title } = Typography;
const vouchers: Voucher[] = [
  {
    id: 1,
    code: "SUMMER50",
    description: "Giảm 50% tối đa 100k",
    discountPercent: 50,
    expireAt: "2025-08-30",
  },
  {
    id: 2,
    code: "FREESHIP",
    description: "Miễn phí vận chuyển cho đơn từ 200k",
    discountAmount: 25000,
    expireAt: "2025-09-15",
  },
  {
    id: 3,
    code: "WELCOME10",
    description: "Giảm 10% cho đơn đầu tiên",
    discountPercent: 10,
    expireAt: "2025-12-31",
  },
];

const VoucherPage: React.FC = () => {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const handleApplyVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <Title level={2} style={{ marginBottom: 16 }}>
        Danh sách Voucher
      </Title>

      {selectedVoucher && (
        <Alert
          message={`Voucher đã chọn: ${selectedVoucher.code}`}
          type="success"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Row gutter={[16, 16]}>
        {vouchers.map((voucher) => (
          <Col xs={24} sm={12} md={8} key={voucher.id}>
            <VoucherCard voucher={voucher} onApply={handleApplyVoucher} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VoucherPage;
