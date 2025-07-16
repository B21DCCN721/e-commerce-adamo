import { Card, Col, Row, Space, Tag, Typography, Image, Button } from "antd";
import type { Order } from "../../../types/order";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface AdminOrderCardProps {
    order: Order;
}
const AdminOrderCard: React.FC<AdminOrderCardProps> = ({ order }) => {
    const navigate = useNavigate();
    return (
        <Card
            style={{ marginBottom: 24 }}
        >
            <Row justify="start" align="middle" style={{ marginBottom: 16 }}>
                <Space>
                    <Typography.Text strong>Mã đơn hàng: {order.id}</Typography.Text>
                    {order.status === 'delivered' && <Tag icon={<CheckCircleOutlined />} color="success">{order.status}</Tag>}
                    {order.status === 'pending' && <Tag icon={<SyncOutlined spin />} color="processing">{order.status}</Tag>}
                    {order.status === 'canceled' && <Tag icon={<CloseCircleOutlined />} color="error">{order.status}</Tag>}
                    {order.status === 'shipped' && <Tag icon={<ClockCircleOutlined />} color="warning">{order.status}</Tag>}
                </Space>
            </Row>

            {order.items.map((item) => (

                <Row gutter={16} key={item.productId} style={{ marginBottom: 12 }}>
                    <Col flex="80px">
                        <Image src={item.productImage} width={80} height={80} style={{ objectFit: "cover" }} />
                    </Col>
                    <Col flex="auto">
                        <Typography.Text strong>{item.productName}</Typography.Text>
                        <div>
                            <Typography.Text type="secondary">Phân loại hàng: {item.productCategory}</Typography.Text>
                        </div>
                        <div>
                            <Typography.Text>x{item.quantity}</Typography.Text>
                        </div>
                    </Col>
                    <Col>
                        <Space direction="vertical" align="end">
                            {item.oldPrice && (
                                <Typography.Text delete type="secondary">
                                    ₫{item.oldPrice.toLocaleString()}
                                </Typography.Text>
                            )}
                            <Typography.Text strong style={{ color: "#ee4d2d" }}>
                                ₫{item.price.toLocaleString()}
                            </Typography.Text>
                        </Space>
                    </Col>
                </Row>
            ))}

            <Row justify="space-between" style={{ marginTop: 16 }}>
                <Col>
                    <Space direction="vertical" align="start">
                        <Typography.Text >
                            Phương thức thanh toán: <b>{order.paymentMethod === 'cash' ? "Tiền mặt" : "Chuyển khoản"}</b>
                        </Typography.Text>
                        <Typography.Text >
                            Trạng thái thanh toán: <b>{order.isPaid ? "Đã thanh toán" : "Đợi thanh toán"}</b>
                        </Typography.Text>
                    </Space>
                </Col>
                <Col>
                    <Space direction="vertical" align="end">
                        <Typography.Text strong>
                            Thành tiền: <span style={{ color: "#ee4d2d" }}>₫{order.totalAmount.toLocaleString()}</span>
                        </Typography.Text>
                        <Button type="primary" onClick={() => navigate(`${order.id}`)}>Chi tiết</Button>
                    </Space>
                </Col>
            </Row>
        </Card>
    )
}
export default AdminOrderCard;