import { Card, Col, Row, Space, Tag, Typography, Image, Button, Modal } from "antd"
import type { Order } from "../../types/order";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";
import FormReview from "../FormReview";
import { useState } from "react";
import formatTime from "../../utils/formatTime";

interface OrderCardProps {
    order: Order;
    handleCancel?: () => void;
    handleRepurchase?: () => void;
    submitReview?: (value, indexItem, orderId) => void;
}
const OrderCard: React.FC<OrderCardProps> = ({ order, handleCancel = () => { }, handleRepurchase = () => {}, submitReview = () => { } }) => {
    const [reviewingIndex, setReviewingIndex] = useState<number | null>(null);

    return (
        <Card
            style={{ marginBottom: 24 }}
        >
            <Row justify="start" align="middle" style={{ marginBottom: 16 }}>
                <Space>
                    {order.status === 'delivered' && <Tag icon={<CheckCircleOutlined />} color="success">Đã được giao</Tag>}
                    {order.status === 'pending' && <Tag icon={<SyncOutlined spin />} color="processing">Đang xử lý</Tag>}
                    {order.status === 'canceled' && <Tag icon={<CloseCircleOutlined />} color="error">Đã hủy</Tag>}
                    {order.status === 'shipping' && <Tag icon={<ExclamationCircleOutlined />} color="warning">Đang vận chuyển</Tag>}
                    {order.status === 'confirmed' && <Tag icon={<ClockCircleOutlined />} color="lime">Đã được xác nhận</Tag>}
                </Space>
            </Row>

            {order.items.map((item, index) => (

                <Row gutter={16} key={index} style={{ marginBottom: 12 }}>
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
                            {order.status === 'delivered' && (<>
                                <>
                                    <Button color="danger" variant="filled" disabled={item.isReview} onClick={() => setReviewingIndex(index)}>Đánh giá</Button>
                                    <Modal
                                        open={reviewingIndex === index}
                                        onCancel={() => setReviewingIndex(null)}
                                        footer={null}
                                        title="Đánh Giá Sản Phẩm"
                                        centered
                                        width={650}
                                    >
                                        <FormReview
                                            onClose={() => setReviewingIndex(null)}
                                            product={{
                                                id: item.productId,
                                                name: item.productName,
                                                category: item.productCategory,
                                                image: item.productImage
                                            }}
                                            onSubmit={(data) => {
                                                submitReview(data, index, order.id);
                                                setReviewingIndex(null);
                                            }}
                                        />
                                    </Modal>

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
                        <Typography.Text >
                            {formatTime(order.updatedAt)}
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
                                <Button type="primary" onClick={handleRepurchase}>Mua lại</Button>
                            </>)}
                            {order.status === 'pending' && (<>
                                <Button type="primary" onClick={handleCancel}>Hủy đơn</Button>
                            </>)}
                            {order.status === 'canceled' && (<>
                                <Button type="primary" onClick={handleRepurchase}>Đặt lại</Button>
                            </>)}
                        </Space>
                    </Space>
                </Col>
            </Row>
        </Card>
    )
}
export default OrderCard;