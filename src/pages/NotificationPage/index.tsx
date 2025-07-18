import type { Notification } from '../../types/notification';
import { Layout, Menu, List, } from 'antd';
import { AppstoreOutlined, GiftOutlined, ShoppingCartOutlined, } from '@ant-design/icons';
import NotificationCard from '../../components/NotificationCard';
import { useState } from 'react';

const { Sider, Content } = Layout;

const notifications:Notification[] = [
  {
    id: 1,
    title: "Đơn hàng đã hoàn tất",
    orderCode: "2507011T8A8VTX",
    time: "06-07-2025 18:03",
    content: "Đơn hàng của bạn đã được giao thành công. Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi.",
    type: "voucher",
    image: "https://via.placeholder.com/100x100.png?text=Tai+Nghe",
    isRead: false,
  },
  {
    id: 2,
    title: "Đơn hàng đã hoàn tất",
    orderCode: "250624DHGK6D2M",
    time: "06-29-2025 20:59",
    content: "Đơn hàng của bạn đã được giao thành công. Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi.",
    type: "order",
    image: "https://via.placeholder.com/100x100.png?text=N%E1%87%A9%E1%BC%89%E1%BC%AE%E1%BC%8D",
    isRead: false,
    orderStatus: 'delivered',
  },
  {
    id: 3,
    title: "Bạn có mã giảm giá mới!",
    orderCode: "",
    time: "01-07-2025 09:00",
    content: "Chúc mừng! Bạn vừa nhận được mã giảm 20k cho đơn hàng từ 199k. Hạn dùng đến 10-07-2025.",
    type: "voucher",
    image: "https://via.placeholder.com/100x100.png?text=Voucher+20k",
    isRead: false,
  },
  {
    id: 4,
    title: "Hệ thống bảo trì",
    orderCode: "",
    time: "02-07-2025 23:00",
    content: "Hệ thống sẽ được bảo trì định kỳ từ 01:00 - 03:00 ngày 03-07-2025. Mong bạn thông cảm.",
    type: "system",
    image: "https://via.placeholder.com/100x100.png?text=System",
    isRead: true,
  },
  {
    id: 5,
    title: "Đơn hàng đang giao",
    orderCode: "250911DFT112D",
    time: "07-07-2025 14:15",
    content: "Đơn hàng của bạn đang trên đường giao. Vui lòng giữ điện thoại để nhận hàng.",
    type: "order",
    image: "https://via.placeholder.com/100x100.png?text=Delivery",
    isRead: false,
    orderStatus: 'shipped',
  },
  {
    id: 6,
    title: "Mã ưu đãi sinh nhật",
    orderCode: "",
    time: "01-07-2025 00:01",
    content: "Happy Birthday! Nhận ngay mã giảm 50k cho đơn từ 300k. Chúc bạn một ngày tuyệt vời!",
    type: "voucher",
    image: "https://via.placeholder.com/100x100.png?text=Happy+BDay",
    isRead: true,
  },
  {
    id: 7,
    title: "Thông báo từ hệ thống",
    orderCode: "",
    time: "04-07-2025 11:11",
    content: "Chúng tôi vừa cập nhật chính sách bảo mật để bảo vệ người dùng tốt hơn.",
    type: "system",
    image: "https://via.placeholder.com/100x100.png?text=Policy+Update",
    isRead: false,
  },
  {
    id: 8,
    title: "Đơn hàng đã bị hủy",
    orderCode: "250711XCDS2H5",
    time: "05-07-2025 17:45",
    content: "Đơn hàng của bạn đã bị hủy do người bán không xác nhận. Vui lòng thử lại hoặc chọn sản phẩm khác.",
    type: "order",
    image: "https://via.placeholder.com/100x100.png?text=Canceled",
    isRead: true,
    orderStatus: 'canceled',
  },
];

export default function NotificationPage() {
  const [activeKey, setActiveKey] = useState<string>("order");
  const filteredNotifications = notifications.filter(
    (item) => item.type === activeKey
  );
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} theme='light'>
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={({ key }) => setActiveKey(key)}
        >
          <Menu.Item key="order" icon={<ShoppingCartOutlined />}>Cập Nhật Đơn Hàng</Menu.Item>
          <Menu.Item key="voucher" icon={<GiftOutlined />}>Khuyến Mãi</Menu.Item>
          <Menu.Item key="system" icon={<AppstoreOutlined />}>Thông Báo Hệ Thống</Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ padding: '24px' }}>
        <Content>
          <List
            itemLayout="vertical"
            dataSource={filteredNotifications}
            renderItem={item => (
              <NotificationCard
                key={item.id}
                item={item}/>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
