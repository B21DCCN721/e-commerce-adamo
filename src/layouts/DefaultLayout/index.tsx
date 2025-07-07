import { Input, Layout, Menu, Row, Col } from 'antd';
import {
  HomeOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import type { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const { Header, Content, Footer } = Layout;


interface DefaultLayoutProps {
  children?: React.ReactNode;
}
// ecommerce
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [searchParams,setSearchParams] = useSearchParams();
  const cart = useSelector((state: RootState) => state.cart.items);
  const quantity: number = useMemo(() => cart.reduce((sum, value) => sum += value.quantity, 0), [cart]);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', paddingLeft: '8px' }}>
        <Row gutter={16}>
          <Col span={15}>
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={[location.pathname]}
            >
              <Menu.Item key='/' icon={<HomeOutlined />}><Link to='/'>Trang chủ</Link></Menu.Item>
              <Menu.Item key='/catogory' icon={<UnorderedListOutlined />}><Link to='/catogory'>Danh mục</Link></Menu.Item>
              <Menu.Item key='/cart' icon={<ShoppingCartOutlined />}><Link to='/cart'>Giỏ hàng <span style={{fontWeight: 'bold'}}>{quantity}</span></Link></Menu.Item>
              {/* <Menu.Item key='/login' icon={<LoginOutlined/>}><Link to='/login'>Đăng nhập</Link></Menu.Item> */}
              <Menu.Item key='/profile' icon={<UserOutlined />}><Link to='/profile'>Thông tin cá nhân</Link></Menu.Item>
            </Menu>
          </Col>
          <Col span={9} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Input.Search
              placeholder="Tìm kiếm sản phẩm"
              allowClear
              enterButton="Tìm kiếm"
              size="large"
              value={searchParams.get('filter') || ''}
              style={{ display: "inline-block" }}
              onSearch={(value) => setSearchParams({filter: value})}
            />
          </Col>
        </Row>
      </Header>

      <Content style={{ margin: '16px' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: '100vh', position: 'relative' }}>
          {children || <Outlet />}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>© 2025 E-COMMERCE</Footer>
    </Layout>

  );
};

export default DefaultLayout;
