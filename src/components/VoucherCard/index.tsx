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
        borderStyle: "dashed",
        borderColor: selected ? "#52c41a" : "#f5222d",
        borderRadius: 12,
        backgroundColor: selected ? "#f6ffed" : undefined,
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      <Title level={4} style={{ color: "#f5222d" }}>
        {discountText} OFF
      </Title>
      <Text strong>Mã giảm giá: {code}</Text>
      <br/>
      <Text>{description}</Text>
      <br />
      <Text type="secondary">
        HSD: {formatTime(expireAt)}
      </Text>
    </Card>
  );
};

export default VoucherCard;
