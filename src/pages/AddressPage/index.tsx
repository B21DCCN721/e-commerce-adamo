import { Button, Card, List, Space, Typography, message, Popconfirm } from "antd";
import { useState } from "react";
import type { Address } from "../../types/address";
import AddressModal from "../../components/AddressModal";

const { Title, Text } = Typography;

const AddressPage = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddAddress = (newAddress: Omit<Address, "id">) => {
        const newId = addresses.length + 1;
        const updated = [...addresses, { id: newId, ...newAddress }];
        setAddresses(updated);
        message.success("Đã thêm địa chỉ!");
    };

    const handleDelete = (id: number) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const handleSetDefault = (id: number) => {
        const updated = addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id,
        }));
        setAddresses(updated);
    };

    return (
        <Card title="Địa chỉ của tôi" extra={
            <Button type="primary" onClick={() => setIsModalOpen(true)}>+ Thêm địa chỉ mới</Button>
        }>
            <List
                itemLayout="horizontal"
                dataSource={addresses}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Space>
                                <a onClick={() => console.log("Update")}>Cập nhật</a>
                                <Popconfirm title="Xoá địa chỉ này?" onConfirm={() => handleDelete(item.id)}>
                                    <a>Xoá</a>
                                </Popconfirm>
                            </Space>,
                            <Button
                                size="small"
                                onClick={() => handleSetDefault(item.id)}
                                disabled={item.isDefault}
                            >
                                Thiết lập mặc định
                            </Button>
                        ]}
                    >
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Title level={5}>{item.fullName} <Text type="secondary">(+84) {item.phone}</Text></Title>
                            <Text>
                                {item.addressDetail}, {item.wardName}, {item.districtName}, {item.provinceName}
                            </Text>
                            {item.isDefault && <div><Text type="danger"><strong>Mặc định</strong></Text></div>}
                        </Space>
                    </List.Item>
                )}
            />

            <AddressModal
                visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={(values) => {
                    handleAddAddress(values);
                    setIsModalOpen(false);
                }}
            />
        </Card>
    );
};

export default AddressPage;
