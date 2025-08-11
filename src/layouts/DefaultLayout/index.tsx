import { ConfigProvider, FloatButton, Layout, Menu, theme as antdTheme, message } from 'antd';
import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  HistoryOutlined,
  ShoppingCartOutlined,
  EditOutlined,
  LoginOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import styles from "./DefaultLayout.module.css";
import type { CartItem } from '../../types/cart';
import { logout } from '../../services/authenticatedService';
import NotificationPopover from '../../components/NotificationPopover';

const { Header, Content, Footer } = Layout;

// ecommerce
const DefaultLayout: React.FC = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();
  const navigate = useNavigate();
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
  const [darkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem('darkMode') ?? 'false'));
  
    const handleChangeMode = () => {
      setDarkMode(!darkMode)
      localStorage.setItem('darkMode', JSON.stringify(!darkMode));
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
            defaultSelectedKeys={["/"]}
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
          >
            <Menu.Item key='/' icon={<HomeOutlined />}>Trang chủ</Menu.Item>
            <Menu.Item key='/category' icon={<UnorderedListOutlined />}>Danh mục</Menu.Item>
            <Menu.Item key='/cart' icon={<ShoppingCartOutlined />}>
              Giỏ hàng {quantity}
            </Menu.Item>
            <Menu.Item key='/history' icon={<HistoryOutlined />}>Đơn hàng</Menu.Item>
            {isAuthenticated && (<Menu.SubMenu key="/profile" icon={<UserOutlined />} title="Tài khoản">
              <Menu.Item key="/profile/info" icon={<EditOutlined />}>
                Hồ sơ
              </Menu.Item>
              <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Đăng xuất
              </Menu.Item>
            </Menu.SubMenu>)}
            {!isAuthenticated && (<Menu.Item key="/login" icon={<LoginOutlined />}>
              Đăng nhập / Đăng ký
            </Menu.Item>)}
          </Menu>
          <NotificationPopover />
        </Header>

        <Content className={styles.content}>
          <div style={{ minHeight: '100vh', padding: "16px", position: 'relative' }}>
            <Outlet />
            <FloatButton.Group shape="circle">
              <FloatButton icon={<QuestionCircleOutlined />} tooltip={{
                title: 'Trợ giúp',
                color: 'black',
                placement: 'left',
              }}
              onClick={() => navigate("/support")}
               />
              <FloatButton icon={darkMode? <MoonOutlined /> : <SunOutlined />} tooltip={{
                title: 'Nền',
                color: 'black',
                placement: 'left',
              }}
              onClick={handleChangeMode}
               />
              <FloatButton.BackTop visibilityHeight={400} tooltip={{
                title: 'Về đầu trang',
                color: 'black',
                placement: 'left',
              }} />
            </FloatButton.Group>
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>© 2025 E-COMMERCE</Footer>
      </Layout>
    </ConfigProvider>

  );
};

export default DefaultLayout;
