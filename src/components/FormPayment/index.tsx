import {Button,Card,Divider,Flex,Form,Input,message,Modal,QRCode,Select,Space,Typography,} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import type { CartItem } from "../../types/cart";
import type { Address } from "../../types/address";
import type { Order } from "../../types/order";

interface FormPaymentProps {
  selectedItems: CartItem[];
  paymentUrl?: string;
  totalPrice: number;
  paymentMethod: string;
  addresses: Address[];
  setPaymentMethod: (value: string) => void;
  onSuccess: () => void;
  onCreateOrder: (order: Order) => void;
}

const FormPayment: React.FC<FormPaymentProps> = ({
  selectedItems,
  totalPrice,
  onSuccess,
  paymentUrl,
  paymentMethod,
  addresses,
  setPaymentMethod,
  onCreateOrder,
}) => {
  const [form] = Form.useForm();
  const [qrVisible, setQrVisible] = useState(false);

  // Select address options
  const addressOptions = addresses.map((addr) => ({
    value: addr.id,
    label: `${addr.addressDetail}, ${addr.wardName}, ${addr.districtName}, ${addr.provinceName}`,
  }));

  // Default address
  const defaultAddress = addresses.find((addr) => addr.isDefault);

  useEffect(() => {
    if (defaultAddress) {
      form.setFieldsValue({
        address: defaultAddress.id,
        phone: defaultAddress.phone,
      });
    }
  }, [defaultAddress, form]);

  // Hàm tạo order
  const createOrder = useCallback(
    (isPaid: boolean, address: Address): Order => ({
      id: Math.random(),
      customerId: 1,
      paymentMethod,
      customerAddress: `${address.addressDetail}, ${address.wardName}, ${address.districtName}, ${address.provinceName}`,
      customerPhone: address.phone,
      status: "pending",
      isPaid,
      totalAmount: totalPrice,
      items: selectedItems.map((item) => ({
        productId: item.id,
        productName: item.name,
        productImage: item.image ?? "",
        productCategory: item.category,
        quantity: item.quantity,
        price: item.price,
        oldPrice: item.oldPrice,
        isReview: false,
      })),
      updatedAt: new Date().toISOString(),
    }),
    [paymentMethod, selectedItems, totalPrice]
  );

  const handleFinish = () => {
    const selectedAddressId = form.getFieldValue("address");
    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

    if (!selectedAddress) {
      message.error("Vui lòng chọn địa chỉ hợp lệ.");
      return;
    }

    if (paymentMethod === "cash") {
      const newOrder = createOrder(false, selectedAddress);
      onCreateOrder(newOrder);
      message.success("Đặt hàng thành công!");
      onSuccess();
      form.resetFields();
    } else {
      setQrVisible(true);
    }
  };

  const handleConfirmPayment = () => {
    const selectedAddressId = form.getFieldValue("address");
    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

    if (!selectedAddress) {
      message.error("Vui lòng chọn địa chỉ hợp lệ.");
      return;
    }

    const newOrder = createOrder(true, selectedAddress);
    onCreateOrder(newOrder);
    message.success("Thanh toán thành công!");
    setQrVisible(false);
    onSuccess();
    form.resetFields();
  };

  return (
    <>
      <Card title="Tóm tắt đơn hàng">
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <div>
              <strong>Số sản phẩm:</strong> {selectedItems.length}
            </div>

            <Form.Item
              label="Phương thức thanh toán"
              name="payment"
              rules={[{ required: true, message: "Vui lòng chọn phương thức" }]}
              initialValue={paymentMethod}
            >
              <Select
                value={paymentMethod}
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
              rules={[{ required: true, message: "Vui lòng chọn địa chỉ" }]}
            >
              <Select
                placeholder="Chọn địa chỉ nhận hàng"
                options={addressOptions}
              />
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
