import { Button, Card, Divider, Flex, Form, Input, message, Modal, QRCode, Select, Space, Typography, } from "antd";
import React, { useCallback, useState } from "react";
import type { CartItem } from "../../types/cart";
import { useDispatch } from "react-redux";
import { addOrder } from "../../features/order/orderSlice";
import type { AppDispatch } from "../../store";

interface FormPaymentProps {
    selectedItems: CartItem[];
    paymentUrl?: string;
    totalPrice: number;
    paymentMethod: string;
    setPaymentMethod: (value: string) => void;
    onSuccess: () => void;
}

const FormPayment: React.FC<FormPaymentProps> = ({ selectedItems, totalPrice, onSuccess, paymentUrl, paymentMethod, setPaymentMethod }) => {
    const [form] = Form.useForm();
    const [qrVisible, setQrVisible] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const createOrder = useCallback(
        (isPaid: boolean) => {
            dispatch(addOrder({
                id: Math.random(),
                customerId: 1,
                paymentMethod,
                customerAddress: form.getFieldValue("address"),
                customerPhone: form.getFieldValue("phone"),
                status: "pending",
                isPaid,
                totalAmount: totalPrice,
                items: selectedItems.map((item) => ({
                    productId: item.id,
                    productName: item.name,
                    productImage: item.image,
                    productCategory: item.category,
                    quantity: item.quantity,
                    price: item.price,
                    oldPrice: 1000000,
                })),
            }));
        },
        [dispatch, form, paymentMethod, selectedItems, totalPrice]
    );

    const handleFinish = () => {
        if (selectedItems.length === 0) {
            message.warning("Bạn chưa chọn sản phẩm nào để thanh toán.");
            return;
        }

        if (paymentMethod === "banking") {
            setQrVisible(true);
            return;
        }
        if (paymentMethod === "cash") {
            createOrder(false);

            // Thanh toán COD
            message.success("Đặt hàng thành công!");
            onSuccess();
            form.resetFields();
        }
    };
    const handleConfirmPayment = async () => {
        try {
            const isPaid = true;

            if (isPaid) {
                createOrder(true);
                message.success("Thanh toán thành công!");
                setQrVisible(false);
                onSuccess();
                form.resetFields();
            } else {
                message.warning("Chúng tôi chưa nhận được thanh toán. Vui lòng thử lại sau vài giây.");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            message.error("Có lỗi khi kiểm tra thanh toán.");
        }
    };

    return (
        <>
            <Card title="Tóm tắt đơn hàng">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    initialValues={{ payment: "cash" }}
                >
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        <div>
                            <strong>Số sản phẩm:</strong> {selectedItems.length}
                        </div>

                        <Form.Item
                            label="Phương thức thanh toán"
                            name="payment"
                            rules={[{ required: true, message: "Vui lòng chọn phương thức" }]}
                        >
                            <Select
                                defaultValue={paymentMethod}
                                options={[
                                    { value: "cash", label: "Thanh toán khi nhận hàng" },
                                    { value: "banking", label: "Chuyển khoản qua QR (VNPay)" },
                                ]}
                                onChange={setPaymentMethod}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                { required: true, message: "Vui lòng nhập số điện thoại" },
                                {
                                    pattern: /^0\d{9}$/,
                                    message: "Số điện thoại phải bắt đầu bằng 0 và đủ 10 số",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ nhận hàng"
                            name="address"
                            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                        >
                            <Input placeholder="Nhập địa chỉ" />
                        </Form.Item>

                        <div>
                            <strong>Tổng tiền:</strong>{" "}
                            <Typography.Text type="danger" strong>
                                {totalPrice.toLocaleString()} VNĐ
                            </Typography.Text>
                        </div>

                        <Divider />

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                disabled={selectedItems.length === 0}
                            >
                                {paymentMethod === "cash" ? "Đặt hàng" : "Thanh toán"}
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Card>

            {/* Modal QR code */}
            <Modal
                title="Quét mã QR để thanh toán"
                open={qrVisible}
                onCancel={() => setQrVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setQrVisible(false)}>
                        Hủy
                    </Button>,
                    <Button key="check" type="primary" onClick={handleConfirmPayment}>
                        Tôi đã thanh toán
                    </Button>,
                ]}
                centered
            >
                <Flex wrap vertical align="center">
                    <QRCode value={paymentUrl || ""} size={200} />
                    <p style={{ marginTop: 16 }}>
                        Vui lòng dùng App ngân hàng hoặc VNPAY để quét mã và thanh toán
                    </p>
                </Flex>
            </Modal>

        </>
    );
};

export default FormPayment;
