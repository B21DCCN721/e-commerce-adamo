import { Button, Card, List, Space, Typography, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import type { Address } from "../../types/address";
import AddressModal from "../../components/AddressModal";
import { addAdress, deleteAddress, getAddressByUserId, updateAddress } from "../../services/userService";

const { Title, Text } = Typography;

const AddressPage = () => {
    const userId: string = localStorage.getItem('userId') ?? '';
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
    const [isCreateNewAddress, setIsCreateNewAddress] = useState(false);
    const handleAddAddress = async (newAddress: Omit<Address, "id">) => {
        try {
            const newId = addresses.length + 1;
            const updated = [...addresses, { id: newId, ...newAddress }];
            await addAdress(userId, updated);
            setAddresses(updated);
            message.success("Đã thêm địa chỉ!");
        } catch (error) {
            message.error("Thêm địa chỉ thất bại");
            console.error('Error adding address:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteAddress(userId, id - 1);
            setAddresses(addresses.filter(addr => addr.id !== id));
            message.success("Đã xoá địa chỉ!");
        } catch (error) {
            console.error('Failed to delete address:', error);
            message.error("Xoá địa chỉ thất bại");

        }
    };

    const handleSetDefault = async (id: number) => {
        try {
            const updatedAddresses = addresses.map(addr => ({
                ...addr,
                isDefault: addr.id === id
            }));
            await updateAddress(userId, updatedAddresses);
            setAddresses(updatedAddresses);
            message.success("Đã thiết lập địa chỉ mặc định!");
        } catch (error) {
            console.log('Failed to set default address:', error);
            message.error("Thiết lập địa chỉ mặc định thất bại");
        }
    };
    const handleUpdateAddress = async (updated: Address) => {
        try {
            if (!defaultAddress) {
                message.error("Không có địa chỉ để cập nhật");
                return;
            }
            const updatedAddresses = addresses.map((addr) =>
                addr.id === defaultAddress.id ? { ...addr, ...updated } : addr
            );
            await updateAddress(userId, updatedAddresses);
            setAddresses(updatedAddresses);
            message.success("Cập nhật địa chỉ thành công!");
        } catch (error) {
            console.error("Failed to update address:", error);
            message.error("Cập nhật địa chỉ thất bại");
        }
    };

    // lấy thông tin địa chỉ
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await getAddressByUserId(userId);
                setAddresses(response);
                message.success("Đã tải địa chỉ thành công!");
            } catch (error) {
                console.error('Failed to fetch addresses:', error);
                message.error("Không thể tải địa chỉ");
            }
        };
        fetchAddresses();
    }, [userId]);

    return (
        <Card title="Địa chỉ của tôi" extra={
            <Button type="primary" onClick={() => {
                setIsModalOpen(true)
                setIsCreateNewAddress(true)
            }} >+ Thêm địa chỉ mới</Button>
        }>
            <List
                itemLayout="horizontal"
                dataSource={addresses}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Space>
                                <Button type="link" onClick={() => {
                                    const selectedAddress = addresses.find(addr => addr.id === item.id);
                                    if (selectedAddress) {
                                        setIsCreateNewAddress(false);
                                        setDefaultAddress(selectedAddress);
                                        setIsModalOpen(true);
                                    }
                                }}>Cập nhật</Button>
                                <Popconfirm title="Xoá địa chỉ này?" onConfirm={() => handleDelete(item.id)}>
                                    <Button type="link">Xoá</Button>
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
                    if (isCreateNewAddress) {
                        handleAddAddress(values)
                    } else {
                        handleUpdateAddress(values);
                    }
                    setIsModalOpen(false);
                }}
                defaultValue={isCreateNewAddress ? {} : defaultAddress}
            />
        </Card>
    );
};

export default AddressPage;
