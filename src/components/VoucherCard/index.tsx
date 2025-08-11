import React from "react";
import { Card, Typography } from "antd";
import formatTime from "../../utils/formatTime";
import type { Voucher } from "../../types/voucher";

const { Title, Text } = Typography;

interface VoucherCardProps {
  voucher: Voucher;
  selected?: boolean;
  onClick?: () => void;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ voucher, selected, onClick }) => {
  const { description, discountPercent, discountAmount, expireAt, code } = voucher;

  const discountText = discountPercent
    ? `${discountPercent}%`
    : discountAmount
    ? `${discountAmount.toLocaleString()}₫`
    : "Ưu đãi";

  return (
    <Card
  hoverable
  onClick={onClick}
  style={{
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: selected ? "#52c41a" : "#e994ddff",
    borderRadius: 16,
    background: selected
      ? "linear-gradient(135deg, #f6ffed, #d9f7be)"
      : "linear-gradient(135deg, #F7CAC9, #92A8D1)",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: selected
      ? "0 4px 12px rgba(82, 196, 26, 0.3)"
      : "0 4px 12px rgba(0, 0, 0, 0.1)",
  }}
>
  <Title level={4} style={{ color: "#d4380d" }}>
    {discountText} OFF
  </Title>
  <Text strong style={{ color: "#262626" }}>
    Mã giảm giá: {code}
  </Text>
  <br />
  <Text style={{ color: "#434343" }}>{description}</Text>
  <br />
  <Text type="secondary">HSD: {formatTime(expireAt)}</Text>
</Card>

  );
};

export default VoucherCard;
