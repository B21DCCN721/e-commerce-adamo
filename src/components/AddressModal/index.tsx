/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Select, Modal, Button, message, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { getProvinces, getDistricts, getWards } from "../../services/addressApi";
import type { Province, District, Ward } from "../../types/address";

const { Option } = Select;

interface Props {
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    defaultValue?: any; // Dữ liệu địa chỉ mặc định nếu có
}

const AddressModal = ({ visible, onClose, onSubmit, defaultValue = {} }: Props) => {
    const [form] = Form.useForm();
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const provinceCode = Form.useWatch("provinceCode", form);
    const districtCode = Form.useWatch("districtCode", form);

    // Load tỉnh/thành phố
    useEffect(() => {
        getProvinces()
            .then((data) => setProvinces(data))
            .catch(() => message.error("Không thể tải danh sách tỉnh/thành phố"));
    }, []);

    // Load quận/huyện khi chọn tỉnh
    useEffect(() => {
        if (provinceCode) {
            getDistricts(String(provinceCode))
                .then(setDistricts)
                .catch(() => message.error("Không thể tải quận/huyện"));
            form.setFieldsValue({ districtCode: undefined, wardCode: undefined });
            setWards([]);
        }
    }, [provinceCode, form]);

    // Load phường/xã khi chọn huyện
    useEffect(() => {
        if (districtCode) {
            getWards(String(districtCode))
                .then(setWards)
                .catch(() => message.error("Không thể tải phường/xã"));
            form.setFieldsValue({ wardCode: undefined });
        }
    }, [districtCode, form]);
    useEffect(() => {
        if (visible && defaultValue) {
            form.setFieldsValue(defaultValue);
        }
    }, [visible, defaultValue, form]);

    const onFinish = (values: any) => {
        const province = provinces.find(p => p.code === values.provinceCode);
        const district = districts.find(d => d.code === values.districtCode);
        const ward = wards.find(w => w.code === values.wardCode);

        const fullAddress = {
            ...values,
            provinceName: province?.name,
            districtName: district?.name,
            wardName: ward?.name,
        };

        console.log("Full Address modal address:", fullAddress);
        onSubmit(fullAddress);
        form.resetFields();
        onClose();
    };


    return (
        <Modal
            width={600}
            open={visible}
            onCancel={() => {
                form.resetFields();
                onClose();
            }}
            title="Thêm địa chỉ"
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                >
                    <Input placeholder="Họ và tên" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        { required: true, message: "Vui lòng nhập số điện thoại" },
                        {
                            pattern: /^0[1-9]{1}[0-9]{8,9}$/,
                            message: 'Số điện thoại phải có 10 hoặc 11 chữ số bắt đầu bằng 0',
                        },
                    ]}
                >
                    <Input placeholder="Số điện thoại" />
                </Form.Item>

                <Row style={{ width: "100%" }} gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="provinceCode"
                            label="Tỉnh/Thành phố"
                            rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
                        >
                            <Select placeholder="Chọn tỉnh/thành phố">
                                {provinces.map((p) => (
                                    <Option key={p.code} value={p.code}>
                                        {p.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            name="districtCode"
                            label="Quận/Huyện"
                            rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
                        >
                            <Select placeholder="Chọn quận/huyện">
                                {districts.map((d) => (
                                    <Option key={d.code} value={d.code}>
                                        {d.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            name="wardCode"
                            label="Phường/Xã"
                            rules={[{ required: true, message: "Vui lòng chọn phường/xã" }]}
                        >
                            <Select placeholder="Chọn phường/xã">
                                {wards.map((w) => (
                                    <Option key={w.code} value={w.code}>
                                        {w.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="addressDetail"
                    label="Địa chỉ cụ thể"
                    rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể" }]}
                >
                    <Input placeholder="Số nhà, tên đường..." />
                </Form.Item>

                {/* <Form.Item label="Thêm vị trí">
                    <LocationPicker
                        onSelect={(lat, lng) => {
                            form.setFieldsValue({ latitude: lat, longitude: lng });
                        }}
                    />
                </Form.Item>
                <Form.Item name="lat" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="lng" hidden>
                    <Input />
                </Form.Item> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Lưu địa chỉ
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddressModal;