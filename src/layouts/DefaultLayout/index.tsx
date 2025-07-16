import { Button, ConfigProvider, Drawer, Layout, Menu, theme as antdTheme} from 'antd';
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

const { Header, Content, Footer } = Layout;

// ecommerce
const DefaultLayout: React.FC = () => {
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
    <ConfigProvider
     theme={{
                algorithm: darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                token: {
                    colorBgContainer: darkMode ? '#141414' : '#ffffff',
                },
            }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header className={styles.header} style={{backgroundColor: token.colorBgContainer, width: "100%", paddingInline: 0}}>
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
          <div style={{ minHeight: '100vh', padding:"16px", position: 'relative' }}>
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
