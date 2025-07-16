import { Card, Col, Row, Typography } from "antd";
import type { CartItem } from "../../types/cart";

const PaymentCard = ({ items }: { items: CartItem[] }) => {
  return (
    <>
      {items.map((item) => (
        <Card key={item.id} hoverable style={{ marginBottom: 8 }}>
          <Row gutter={16}>
            <Col span={6}>
              <img src={item.image} alt={item.name} style={{ width: "100%" }} />
            </Col>
            <Col span={18}>
              <Typography.Title level={5}>{item.name}</Typography.Title>
              <p>Thể loại: {item.category}</p>
              <p>Size: {item.size}</p>
              <p>Giá: {item.price.toLocaleString()} VNĐ</p>
              <p>Số lượng: {item.quantity}</p>
              <p>
                Thành tiền:{" "}
                {(item.price * item.quantity).toLocaleString()} VNĐ
              </p>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};

export default PaymentCard;
