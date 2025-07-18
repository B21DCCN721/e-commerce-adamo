// NotificationPopover.tsx
import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Popover, List, Typography, Avatar, Tag, Divider, Button, Badge } from 'antd';
import type { Notification } from '../../types/notification';
import { Link } from 'react-router-dom';
const { Text } = Typography;

const notifications: Notification[] = [
    {
        id: 1,
        title: "POND'S SALE HỜI DUY NHẤT HÔM NAY",
        content: "🎉Mua 1 tặng 1 sữa rửa mặt Simple 🎀 Áp thêm mã giảm Content Xtra đến 15%",
        image: '🛍️',
        isRead: false,
        type: 'sale',
    },
    {
        id: 2,
        title: 'MÃ SHOPEE CHOICE VỀ VÍ',
        content: '🎉 Bạn đã nhận voucher giảm ngay 25% khi mua hàng tại Shopee Choice!',
        highlight: 'Hiệu lực từ ngày: 17-07-2025',
        image: '🏷️',
        isRead: false,
        type: 'sale',
    },
    {
        id: 3,
        title: 'CƠ HỘI CUỐI CHỐT DEAL GIẢM 50%',
        content: '🎉 Tại Ngày hội Thương hiệu LIXIBOX 🎀 Cùng mã giảm độc quyền đến 600K',
        image: '🛍️',
        isRead: false,
        type: 'sale',
    },
    {
        id: 4,
        title: '21H SHOP MỚI TUNG MÃ CỰC XỊN',
        content: '🎉 Tặng liền tay mã giảm đến 100K 🎉 Thêm mã giảm 150K, 250K cực hời',
        image: '🎊',
        isRead: false,
        type: 'sale',
    },
    {
        id: 5,
        title: 'TRỌN BỘ MÃ GIẢM XỊN #15.7🔥',
        content: '🎉 Toàn sàn: mã giảm 500K 🎉 Đổi sớm: mã giảm 777K',
        image: '🔥',
        isRead: false,
        type: 'sale',
    },
];

const NotificationPopover: React.FC = () => {
    const content = (
        <div style={{ width: 350 }}>
            <Text strong style={{ fontSize: 16 }}>Thông Báo Mới Nhận</Text>
            <Divider style={{ margin: '8px 0' }} />
            <List
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={(item) => (
                    <List.Item style={{ padding: '8px 0' }}>
                        <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: '#f56a00' }}>{item.image}</Avatar>}
                            title={<Text strong>{item.title}</Text>}
                            description={
                                <>
                                    <div>{item.content}</div>
                                    {item.highlight && <Tag color="volcano">{item.highlight}</Tag>}
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
            <Divider style={{ margin: '8px 0' }} />
            <div style={{ textAlign: 'center' }}>
                <Link to="/notification">Xem tất cả</Link>
            </div>
        </div>
    );

    return (
        <Popover
            content={content}
            title={null}
            placement="bottomRight"
        >
            <div style={{ position: 'absolute', right: 30, top: 5 }}>
                <Badge count={8}>
                    <Button
                        shape="circle"
                        icon={<BellOutlined style={{ fontSize: "20px" }} />}
                        size="large"
                        style={{
                            width: "40px",
                            height: "40px",
                        }}
                    />
                </Badge>
            </div>
        </Popover>
    );
};

export default NotificationPopover;
