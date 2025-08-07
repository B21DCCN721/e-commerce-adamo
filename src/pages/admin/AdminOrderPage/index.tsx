import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Space, Select, Drawer, Descriptions, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Order, OrderStatus } from "../../../types/order";
import { getAllOrders, updatedOrder } from "../../../services/orderService";
import { FileExcelOutlined } from "@ant-design/icons";
import exportToExcel from "../../../utils/exportToExcel";

const statusColors: Record<OrderStatus, string> = {
    pending: "orange",
    shipping: "blue",
    delivered: "green",
    canceled: "red",
    confirmed: "purple",
};

const AdminOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch {
            message.error("Lỗi tải danh sách đơn hàng");
        } finally {
            setLoading(false);
        }
    };
    const handleStatusChange = async (orderId: number, userId: string, status: OrderStatus) => {
        try {
            const ordersOfUserId = orders.filter((order) => order.customerId === userId)
            const updatedOrderOfUserId = ordersOfUserId.map((order) => {
                if (order.id === orderId) {
                    return {
                        ...order,
                        status: status,
                        updatedAt: new Date().toISOString()
                    };
                }
                return order;
            });
            await updatedOrder(userId, updatedOrderOfUserId);
            fetchOrders()
            message.success("Cập nhật trạng thái thành công");
        } catch {
            message.error("Lỗi cập nhật trạng thái");
        }
    };

    const columns: ColumnsType<Order> = [
        { title: "ID", dataIndex: "id", key: "id", width: 70 },
        { title: "Khách hàng", dataIndex: "customerId", key: "customerId" },
        { title: "Điện thoại", dataIndex: "customerPhone", key: "customerPhone" },
        { title: "Địa chỉ", dataIndex: "customerAddress", key: "customerAddress" },
        {
            title: "Trạng thái",
            key: "status",
            render: (_, record) => (
                <Tag color={statusColors[record.status]}>{record.status.toUpperCase()}</Tag>
            ),
            filters:
                Object.keys(statusColors).map((key) => ({
                    text: key,
                    value: key,
                }))
            ,
            onFilter: (value, record) => record.status === value,
        },
        {
            title: "Tổng tiền", dataIndex: "totalAmount", key: "totalAmount", render: (v) => `${v.toLocaleString()} đ`,
            sorter: (a, b) => a.totalAmount - b.totalAmount,
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Select
                        defaultValue={record.status}
                        style={{ width: 120 }}
                        onChange={(value) => handleStatusChange(record.id, record.customerId, value as OrderStatus)}
                        options={Object.keys(statusColors).map((key) => ({
                            value: key,
                            label: key,
                        }))}
                    />
                    <Button type="link" onClick={() => setSelectedOrder(record)}>Chi tiết</Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchOrders();
    }, []);
    // xuất file excel
    const handleExport = () => {
        exportToExcel(orders, "san-pham.xlsx");
    };

    return (
        <>
            <Button style={{ marginBottom: 16 }} color="cyan" variant="outlined" icon={<FileExcelOutlined />} 
                iconPosition="end" onClick={handleExport}>
                Xuất file excel
            </Button>
            <Table<Order>
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={orders}
                pagination={{ pageSize: 10 }}
            />

            {/* Drawer hiển thị chi tiết đơn hàng */}
            <Drawer
                title={`Chi tiết đơn hàng #${selectedOrder?.id}`}
                open={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                width={600}
            >
                {selectedOrder && (
                    <>
                        <Descriptions bordered column={1} size="small">
                            <Descriptions.Item label="Khách hàng">{selectedOrder.customerId}</Descriptions.Item>
                            <Descriptions.Item label="SĐT">{selectedOrder.customerPhone}</Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ">{selectedOrder.customerAddress}</Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">
                                <Tag color={statusColors[selectedOrder.status]}>{selectedOrder.status}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Tổng tiền">
                                {selectedOrder.totalAmount.toLocaleString()} đ
                            </Descriptions.Item>
                        </Descriptions>

                        <h4 style={{ marginTop: 16 }}>Sản phẩm trong đơn</h4>
                        {selectedOrder.items.map((item) => (
                            <div
                                key={item.productId}
                                style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
                            >
                                <img
                                    src={item.productImage}
                                    alt={item.productName}
                                    style={{ width: 50, height: 50, objectFit: "cover", marginRight: 8 }}
                                />
                                <div>
                                    <div>{item.productName} ({item.size})</div>
                                    <div>Số lượng: {item.quantity} | Giá: {item.price.toLocaleString()} đ</div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </Drawer>
        </>
    );
};

export default AdminOrdersPage;
