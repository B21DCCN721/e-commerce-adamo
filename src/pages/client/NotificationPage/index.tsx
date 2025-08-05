import type { Notification } from '../../../types/notification';
import { Layout, Menu, List, Flex, Spin, } from 'antd';
import { AppstoreOutlined, GiftOutlined, ShoppingCartOutlined, } from '@ant-design/icons';
import NotificationCard from '../../../components/NotificationCard';
import { useEffect, useState } from 'react';
import { getListNotifications } from '../../../services/notificationService';

const { Sider, Content } = Layout;


export default function NotificationPage() {
  const userId = localStorage.getItem('userId') ?? '';
  const [activeKey, setActiveKey] = useState<string>("order");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const filteredNotifications = notifications.filter(
    (item) => item.type === activeKey
  );
  // lấy dữ liệu noti
  useEffect(() => {
    const fecthListNoti = async () => {
      setLoading(true);
      try {
        const response = await getListNotifications(userId);
        setNotifications(response);
      } catch (error) {
        console.log('Failed to get list noti ', error);
      } finally {
        setLoading(false);
      }
    }
    fecthListNoti();
  },[userId]);
  if (loading) {
    return <Flex justify="center"><Spin size="large" /></Flex>
  }
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
