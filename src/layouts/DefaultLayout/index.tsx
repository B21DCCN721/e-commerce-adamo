import { Button, ConfigProvider, Drawer, Layout, Menu, theme as antdTheme, message } from 'antd';
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
  SettingOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import type { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import styles from "./DefaultLayout.module.css";
import FormSetting from '../../components/FormSetting';
import type { CartItem } from '../../types/cart';
import { logout } from '../../services/authenticated';

const { Header, Content, Footer } = Layout;

// ecommerce
const DefaultLayout: React.FC = () => {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true" ||
    sessionStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();
  const [openSetting, setOpenSetting] = useState(false);
  const showDrawer = () => {
    setOpenSetting(true);
  };
  const onClose = () => {
    setOpenSetting(false);
  };
  const darkMode = JSON.parse(localStorage.getItem('darkMode') ?? 'false');
  const { token } = antdTheme.useToken();
  const cart: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const quantity: number = useMemo(() => cart.reduce((sum, value) => sum += value.quantity, 0), [cart]);
  const handleLogout = async () => {
    try {
        await logout();
        message.success("Đăng xuất thành công");
    } catch (error) {
      message.error("Đăng xuất thất bại");
      console.log(error)
    }
  }
  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorBgContainer: darkMode ? '#141414' : '#ffffff',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header className={styles.header} style={{ backgroundColor: token.colorBgContainer, width: "100%", paddingInline: 0 }}>
          <Menu
            theme={darkMode ? 'dark' : 'light'}
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
            {isAuthenticated && (<Menu.SubMenu key="profile" icon={<UserOutlined />} title="Tài khoản">
              <Menu.Item key="/profile/info" icon={<EditOutlined />}>
                <Link to="/profile/info">Chỉnh sửa thông tin</Link>
              </Menu.Item>
              <Menu.Item key="/profile/password" icon={<LockOutlined />}>
                <Link to="/profile/password">Đổi mật khẩu</Link>
              </Menu.Item>
              <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Đăng xuất
              </Menu.Item>
            </Menu.SubMenu>)}
            {!isAuthenticated && (<Menu.Item key="/login" icon={<LoginOutlined />}>
              <Link to="/login">Đăng nhập</Link>
            </Menu.Item>)}
          </Menu>
        </Header>

        <Content className={styles.content}>
          <div style={{ minHeight: '100vh', padding: "16px", position: 'relative' }}>
            <Outlet />
            <Button
              type="primary"
              shape="circle"
              icon={<SettingOutlined style={{ fontSize: "20px" }} />}
              size="large"
              style={{
                position: 'fixed',
                right: 30,
                bottom: 100,
                zIndex: 1000,
                transition: 'transform 0.3s ease',
                width: "40px",
                height: "40px",
              }}
              className="floating-setting-btn"
              onClick={showDrawer}
            />
            <Drawer
              title="Cài đặt"
              closable={{ 'aria-label': 'Close Button' }}
              onClose={onClose}
              open={openSetting}
            >
              <FormSetting closeDrawer={onClose} />
            </Drawer>
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>© 2025 E-COMMERCE</Footer>
      </Layout>
    </ConfigProvider>

  );
};

export default DefaultLayout;
