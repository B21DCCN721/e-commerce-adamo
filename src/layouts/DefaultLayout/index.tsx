import { Layout, Menu, } from 'antd';
import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  HistoryOutlined,
  ShoppingCartOutlined,
  EditOutlined,
  LockOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import type { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import styles from "./DefaultLayout.module.css";

const { Header, Content, Footer } = Layout;

// ecommerce
const DefaultLayout: React.FC = () => {
  const location = useLocation();
  const cart = useSelector((state: RootState) => state.cart.items);
  const quantity: number = useMemo(() => cart.reduce((sum, value) => sum += value.quantity, 0), [cart]);
  // const content = (
  //   <div style={{ width: 320 }}>
  //     <List
  //       itemLayout="horizontal"
  //       dataSource={cart.slice(0, 3)}
  //       renderItem={(item) => (
  //         <List.Item>
  //           <List.Item.Meta
  //             avatar={<Avatar shape="square" size={48} src={item.image} />}
  //             title={<span>{item.name}</span>}
  //             description={`Size: ${item.size}`}
  //           />
  //           <div style={{ color: '#d0011b' }}>{item.price.toLocaleString()}₫</div>
  //         </List.Item>
  //       )}
  //     />
  //     <Link to="/cart">
  //       <Button type="primary" block style={{ marginTop: 8 }}>
  //         Xem Giỏ Hàng
  //       </Button>
  //     </Link>
  //   </div>
  // );
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={styles.header}>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key='/' icon={<HomeOutlined />}><Link to='/'>Trang chủ</Link></Menu.Item>
          <Menu.Item key='/catogory' icon={<UnorderedListOutlined />}><Link to='/catogory'>Danh mục</Link></Menu.Item>
          <Menu.Item key='/cart' icon={<ShoppingCartOutlined />}>
            <Link to='/cart'>Giỏ hàng {quantity}</Link>
          </Menu.Item>
          <Menu.Item key='/history' icon={<HistoryOutlined />}><Link to='/history'>Lịch sử đơn hàng</Link></Menu.Item>
          {/* <Menu.Item key='/login' icon={<LoginOutlined/>}><Link to='/login'>Đăng nhập</Link></Menu.Item> */}
          <Menu.SubMenu key="profile" icon={<UserOutlined />} title="Tài khoản">
            <Menu.Item key="/profile/info" icon={<EditOutlined />}>
              <Link to="/profile/info">Chỉnh sửa thông tin</Link>
            </Menu.Item>
            <Menu.Item key="/profile/password" icon={<LockOutlined />}>
              <Link to="/profile/password">Đổi mật khẩu</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined />}>
                  <Link to="/login">Đăng xuất</Link>
                </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="/login" icon={<LoginOutlined />}>
            <Link to="/login">Đăng nhập</Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content className={styles.content}>
        <div style={{ padding: 24, background: '#fff', minHeight: '100vh', position: 'relative' }}>
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>© 2025 E-COMMERCE</Footer>
    </Layout>

  );
};

export default DefaultLayout;
