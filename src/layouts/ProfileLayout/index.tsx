import { BookOutlined, EnvironmentOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ProfileLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Layout>
            <Sider width={220} theme='light' style={{position: 'relative', left:'-32px', top:'-16px', height:"100vh"}}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["/profile/info"]}
                    selectedKeys={[location.pathname]}
                    onClick={({ key }) => navigate(key)}
                >
                    <Menu.Item key="/profile/info" icon={<UserOutlined />}>Thông tin cá nhân</Menu.Item>
                    <Menu.Item key="/profile/address" icon={<EnvironmentOutlined />}>Địa chỉ</Menu.Item>
                    <Menu.Item key="/profile/voucher" icon={<BookOutlined />}>Kho voucher</Menu.Item>
                    <Menu.Item key="/profile/change-password" icon={<LockOutlined />}>Đổi mật khẩu</Menu.Item>
                </Menu>
            </Sider>

            <Content style={{ padding: '0px 24px 24px'}}>
                <Outlet />
            </Content>
        </Layout>
    );
}

export default ProfileLayout;