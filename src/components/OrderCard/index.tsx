import { Card, Col, Row, Space, Tag, Typography, Image, Button } from "antd"
import type { Order } from "../../types/order";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";
import ModalReview from "../ModalReview";
import { useState } from "react";

interface OrderCardProps {
    order: Order;
    handleCanceled?: () => void;
    submitReview?: (value) => void;
}
const OrderCard: React.FC<OrderCardProps> = ({ order, handleCanceled = () => { }, submitReview = () => { } }) => {
    const [showReview, setShowReview] = useState(false);
    const handleReview = () => {
        setShowReview(true);
    }
    return (
        <Card
            style={{ marginBottom: 24 }}
        >
            <Row justify="start" align="middle" style={{ marginBottom: 16 }}>
                <Space>
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
                            {order.status === 'pending' && (<>
                                <>
                                    <Button color="danger" variant="filled" onClick={handleReview}>Đánh giá</Button>
                                    <ModalReview
                                        open={showReview}
                                        onClose={() => setShowReview(false)}
                                        product={{
                                            id: item.productId,
                                            name: item.productName,
                                            category: item.productCategory,
                                            image: item.productImage
                                        }}
                                        onSubmit={(data) => {
                                            submitReview(data)
                                        }}
                                    />
                                </>
                            </>)}
                        </Space>
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
                        <Space>
                            {order.status === 'delivered' && (<>
                                <Button type="primary">Mua lại</Button>
                            </>)}
                            {order.status === 'pending' && (<>
                                <Button type="primary" onClick={handleCanceled}>Hủy đơn</Button>
                            </>)}
                            {order.status === 'shipped' && (<>
                                <Button type="primary">Theo dõi</Button>
                            </>)}
                            {order.status === 'canceled' && (<>
                                <Button type="primary">Đặt lại</Button>
                            </>)}
                        </Space>
                    </Space>
                </Col>
            </Row>
        </Card>
    )
}
export default OrderCard;