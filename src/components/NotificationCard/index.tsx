// components/NotificationCard.tsx
import React from 'react';
import { Card, Typography, Button, Row, Col, Space } from 'antd';
import type { Notification } from '../../types/notification';

const { Text, Paragraph } = Typography;

interface OrderNotificationProps {
  item: Notification;
}

const NotificationCard: React.FC<OrderNotificationProps> = ({ item }) => {
  let title = "";
  switch (item.type) {
    case 'order':
      switch (item.orderStatus) {
        case 'pending':
          title = "Đơn hàng đang chờ xử lý";
          break;
        case 'shipped':
          title = "Đơn hàng đang được giao";
          break;
        case 'delivered':
          title = "Đơn hàng đã hoàn tất";
          break;
        case 'canceled':
          title = "Đơn hàng đã bị hủy";
          break;
        default:
          title = "Thông báo đơn hàng";
      }
      break;
    case 'voucher':
      title = "Bạn có mã giảm giá mới!";
      break;
    case 'system':
      title = "Hệ thống bảo trì";
      break;
    default:
      title = "Thông báo mới";
  }
  return (
    <Card style={{
      marginBottom: 16, backgroundColor: item.isRead ? '#fff' : '#e6f7ff',
    }}>
      <Row gutter={16} align="middle">
        <Col flex="80px">
          <img
            src={item.image}
            alt="product"
            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }}
          />
        </Col>
        <Col flex="auto">
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <Text strong>{title}</Text>
            <Paragraph style={{ margin: 0 }}>
              Mã đơn hàng <Text strong>{item.orderCode}</Text>
            </Paragraph>
            <Text>{item.content}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {item.time ? new Date(item.time).toLocaleString() : 'Chưa có thời gian'}
            </Text>
          </Space>
        </Col>
        <Col>
          {item.type === 'order' && item.orderStatus === 'delivered' && <Button color="danger" variant="filled">Đánh Giá Sản Phẩm</Button>}
        </Col>
      </Row>
    </Card>
  );
};

export default NotificationCard;
