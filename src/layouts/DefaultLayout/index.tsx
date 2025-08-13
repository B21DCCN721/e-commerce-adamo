import { Col, ConfigProvider, Divider, Flex, FloatButton, Layout, Menu, Row, Space, Typography, theme as antdTheme, message, Image } from 'antd';
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
  MailOutlined,
  PhoneOutlined,
  InstagramOutlined,
  FacebookOutlined,
  XOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import styles from "./DefaultLayout.module.css";
import type { CartItem } from '../../types/cart';
import { logout } from '../../services/authenticatedService';
import NotificationPopover from '../../components/NotificationPopover';
import logoWeb from '../../assets/imgs/logoSilverWolf.png';

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
              Giỏ hàng <span style={{ fontWeight: "bold", color: "red" }}>{quantity}</span>
            </Menu.Item>
            <Menu.Item key='/history' icon={<HistoryOutlined />}>Đơn hàng</Menu.Item>
            {isAuthenticated && (<Menu.SubMenu key="/profile" icon={<UserOutlined />} title="Tài khoản">
              <Menu.Item key="/profile/info" icon={<EditOutlined />}>
                Hồ sơ
              </Menu.Item>
              <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
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
              <FloatButton icon={darkMode ? <MoonOutlined /> : <SunOutlined />} tooltip={{
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
        <Divider />
        <Footer className={`${styles["footer-dark"]} ${styles["ant-typography"]}`}>
          <Row gutter={32}>
            <Col span={6}>
              <Typography.Title level={5} className={styles.whiteText}>CLOTHING STORE <span><Image src={logoWeb} preview={false} width={40} height={40}/></span></Typography.Title>
              <Space direction='vertical' size={'middle'} align='start'>
                <Typography.Paragraph className={styles.whiteText}>CLOTHING STORE là cửa hàng bán trang phục trực tuyến cho phép người dùng mua sắm dễ dàng, thuận tiện.</Typography.Paragraph>
                <Link to="#">Chính sách riêng tư</Link>
                <Link to="#">Điều khoản và dịch vụ</Link>
              </Space>
            </Col>
            <Col span={6}>
              <Typography.Title level={5} className={styles.whiteText}>THÔNG TIN</Typography.Title>
              <Space direction='vertical' size={'middle'} align='start'>
                <Link to="#">Về CLOTHING STORE</Link>
                <Link to="#">Về chúng tôi</Link>
                <Link to="#">Thanh toán</Link>
              </Space>
            </Col>
            <Col span={6}>
              <Typography.Title level={5} className={styles.whiteText}>TRỢ GIÚP</Typography.Title>
              <Space direction='vertical' size={'middle'} align='start'>
                <Link to="#">Tài khoản</Link>
                <Link to="#">Vận chuyển đơn hàng</Link>
                <Link to="#">Trạng thái đơn hàng</Link>
                <Link to="#">Trả hàng và hoàn tiền</Link>
              </Space>
            </Col>
            <Col span={6}>
              <Typography.Title level={5} className={styles.whiteText}>LIÊN HỆ</Typography.Title>
              <Space direction='vertical'>
                <Space style={{cursor:"pointer"}}>
                  <InstagramOutlined />
                  <FacebookOutlined />
                  <XOutlined />
                </Space>
                <Typography.Text className={styles.whiteText}>
                  <PhoneOutlined style={{color:"#F94D1C"}}/>
                  <span style={{marginLeft:"16px"}}>1900 1234</span>
                </Typography.Text>
                <Typography.Text className={styles.whiteText}>
                  <MailOutlined style={{color:"#F94D1C"}}/>
                  <span style={{marginLeft:"16px"}}>covocuc@gmail.com</span>
                </Typography.Text>
              </Space>
            </Col>
          </Row>
          <Divider />
          <Flex justify='space-between' align='center'>
            <Space>
              <Typography.Title level={5} className={styles.whiteText}>Danh mục sản phẩm</Typography.Title>
              <Divider type='vertical'/>
              <Typography.Title level={5} className={styles.whiteText}>Áo</Typography.Title>
              <Typography.Title level={5} className={styles.whiteText}>Quần</Typography.Title>
              <Typography.Title level={5} className={styles.whiteText}>Giày</Typography.Title>
            </Space>
            <Typography.Title level={5} className={styles.whiteText}>© 2025 CLOTHING STORE</Typography.Title>
          </Flex>
        </Footer>
      </Layout>
    </ConfigProvider>

  );
};

export default DefaultLayout;
