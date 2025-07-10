import { Card, Col, Row, Space, Tag, Typography, Image, Button } from "antd"
import type { Order } from "../../schemas/order";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";

interface OrderCardProps {
    order: Order;
}
const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    return (
        <Card
            style={{ marginBottom: 24 }}
        >
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Space>
                    <Typography.Text type="secondary">{order.deliverySuccessAt}</Typography.Text>
                    {order.status === 'delivered' && <Tag icon={<CheckCircleOutlined />} color="success">{order.statusLabel}</Tag>}
                    {order.status === 'pending' && <Tag icon={<SyncOutlined spin />} color="processing">{order.statusLabel}</Tag>}
                    {order.status === 'canceled' && <Tag icon={<CloseCircleOutlined />} color="error">{order.statusLabel}</Tag>}
                    {order.status === 'shipping' && <Tag icon={<ClockCircleOutlined />} color="warning">{order.statusLabel}</Tag>}
                </Space>
            </Row>

            {order.items.map((item) => (
                <Row gutter={16} key={item.id} style={{ marginBottom: 12 }}>
                    <Col flex="80px">
                        <Image src={item.productImage} width={80} height={80} />
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
                            {item.originalPrice && (
                                <Typography.Text delete type="secondary">
                                    ₫{item.originalPrice.toLocaleString()}
                                </Typography.Text>
                            )}
                            <Typography.Text strong style={{ color: "#ee4d2d" }}>
                                ₫{item.price.toLocaleString()}
                            </Typography.Text>
                        </Space>
                    </Col>
                </Row>
            ))}

            <Row justify="end" style={{ marginTop: 16 }}>
                <Space direction="vertical" align="end">
                    <Typography.Text strong>
                        Thành tiền: <span style={{ color: "#ee4d2d" }}>₫{order.totalAmount.toLocaleString()}</span>
                    </Typography.Text>
                    <Space>
                        {order.status === 'delivered' && (<>
                            <Button type="primary">Đánh Giá</Button>
                            <Button type="primary">Mua lại</Button>
                        </>)}
                        {order.status === 'pending' && (<>
                            <Button type="primary">Hủy đơn</Button>
                        </>)}
                        {order.status === 'shipping' && (<>
                            <Button type="primary">Theo dõi</Button>
                        </>)}
                        {order.status === 'canceled' && (<>
                            <Button type="primary">Đặt lại</Button>
                        </>)}
                    </Space>
                </Space>
            </Row>
        </Card>
    )
}
export default OrderCard;