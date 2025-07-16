import React from "react";
import { Card, Table, Tag, Button, Descriptions, Space, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Order, OrderItem, OrderStatus } from "../../../types/order"; // Adjust path as needed
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";

interface Props {
    order: Order;
    onUpdateStatus: (status: OrderStatus) => void;
    onMarkPaid: () => void;
}

const AdminOrderDetail: React.FC<Props> = ({ order, onUpdateStatus, onMarkPaid }) => {
    const columns: ColumnsType<OrderItem> = [
        {
            title: "Sản phẩm",
            dataIndex: "productName",
        },
        {
            title: "Hình ảnh",
            dataIndex: "productImage",
            render: (url) => <img src={url} alt="" style={{ width: 60, borderRadius: 4 }} />,
        },
        {
            title: "Danh mục",
            dataIndex: "productCategory",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            render: (price) => price.toLocaleString("vi-VN") + " ₫",
        },
        {
            title: "Tổng",
            render: (_, item) =>
                (item.price * item.quantity).toLocaleString("vi-VN") + " ₫",
        },
    ];

    const handleStatusChange = (next: OrderStatus) => {
        if (order.status === next) return;
        onUpdateStatus(next);
        message.success("Cập nhật trạng thái thành công");
    };

    return (
        <Card title={`Đơn hàng #${order.id}`}>
            <Descriptions bordered column={1} size="middle">
                <Descriptions.Item label="Khách hàng">{order.customerId}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">{order.customerPhone}</Descriptions.Item>
                <Descriptions.Item label="Địa chỉ giao hàng">{order.customerAddress}</Descriptions.Item>
                <Descriptions.Item label="Phương thức thanh toán">{order.paymentMethod}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái đơn hàng">
                    {order.status === 'delivered' && <Tag icon={<CheckCircleOutlined />} color="success">{order.status}</Tag>}
                    {order.status === 'pending' && <Tag icon={<SyncOutlined spin />} color="processing">{order.status}</Tag>}
                    {order.status === 'canceled' && <Tag icon={<CloseCircleOutlined />} color="error">{order.status}</Tag>}
                    {order.status === 'shipped' && <Tag icon={<ClockCircleOutlined />} color="warning">{order.status}</Tag>}
                </Descriptions.Item>
                <Descriptions.Item label="Đã thanh toán">
                    {order.isPaid ? <Tag color="green">Đã thanh toán</Tag> : <Tag color="red">Chưa thanh toán</Tag>}
                </Descriptions.Item>
                <Descriptions.Item label="Thành tiền">
                    <strong style={{ color: "#fa541c", fontSize: 16 }}>
                        {order.totalAmount.toLocaleString("vi-VN")} ₫
                    </strong>
                </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
                <Table
                    columns={columns}
                    dataSource={order.items}
                    rowKey={(item) => item.productId}
                    pagination={false}
                />
            </div>

            <div style={{ marginTop: 24, textAlign: "right" }}>
                <Space>
                    {!order.isPaid && (
                        <Popconfirm
                            title="Xác nhận đã thanh toán đơn hàng này?"
                            onConfirm={onMarkPaid}
                        >
                            <Button type="primary">Đánh dấu đã thanh toán</Button>
                        </Popconfirm>
                    )}

                    {order.status === "pending" && (
                        <Button onClick={() => handleStatusChange("shipped")}>Xác nhận giao hàng</Button>
                    )}

                    {order.status === "shipped" && (
                        <Button onClick={() => handleStatusChange("delivered")} type="primary">
                            Đánh dấu đã giao
                        </Button>
                    )}

                    {order.status !== "canceled" && order.status !== "delivered" && (
                        <Popconfirm
                            title="Bạn có chắc muốn hủy đơn hàng này?"
                            onConfirm={() => handleStatusChange("canceled")}
                        >
                            <Button danger>Hủy đơn</Button>
                        </Popconfirm>
                    )}
                </Space>
            </div>
        </Card>
    );
};

export default AdminOrderDetail;
