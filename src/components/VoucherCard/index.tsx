// components/VoucherCard.tsx
import React from "react";
import { Card, Button, Typography } from "antd";
import formatTime from "../../utils/formatTime";
import type { Voucher } from "../../types/voucher";

const { Title, Text } = Typography;

interface VoucherCardProps {
  voucher: Voucher;
  onApply?: (voucher: Voucher) => void;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ voucher, onApply }) => {
  const { description, discountPercent, discountAmount, expireAt } = voucher;

  const discountText = discountPercent
    ? `${discountPercent}%`
    : discountAmount
    ? `${discountAmount.toLocaleString()}₫`
    : "Ưu đãi";

  return (
    <Card
      style={{
        borderStyle: "dashed",
        borderColor: "#f5222d",
        borderRadius: 12,
      }}
      hoverable
    >
      <Title level={4} style={{ color: "#f5222d" }}>
        {discountText} OFF
      </Title>
      <Text>{description}</Text>
      <br />
      <Text type="secondary">
        HSD: {formatTime(expireAt)}
      </Text>
      <div style={{ marginTop: 12 }}>
        <Button type="primary" danger onClick={() => onApply?.(voucher)}>
          Áp dụng
        </Button>
      </div>
    </Card>
  );
};

export default VoucherCard;
