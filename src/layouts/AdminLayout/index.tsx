import React, { useState } from "react";
import { Badge, Button, Layout, Menu, Typography } from "antd";
import {
  DashboardOutlined,
  AreaChartOutlined,
  BellOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Notification from "../../components/admin/Notification";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "management",
      icon: <AppstoreOutlined />,
      label: "Quản lý",
      children: [
        {key:"/admin/management/product", label: "Thêm sản phẩm"},
        {key:"/admin/management/import", label: "Nhập sản phẩm"},
        {key:"/admin/management/order", label:"Đơn hàng"},
      ]
    },
    {
      key: "statistics",
      icon: <AreaChartOutlined />,
      label: "Thống kê",
      children: [
        { key: "/admin/statistics/overview", label: "Tổng quan" },// Tổng doanh thu, đơn hàng, khách hàng, sản phẩm...
        { key: "/admin/statistics/revenue", label: "Doanh thu" },// Doanh thu theo ngày / tháng / năm; Biểu đồ tăng trưởng;Doanh thu theo phương thức thanh toán
        { key: "/admin/statistics/orders", label: "Đơn hàng" },// Bán chạy nhất; Tồn kho thấp; Được xem nhiều nhất
        { key: "/admin/statistics/products", label: "Sản phẩm" },// Tổng số đơn; Tỷ lệ hủy đơn; Trạng thái đơn hàng; Trung bình giá trị đơn
        { key: "/admin/statistics/customers", label: "Khách hàng" },// Khách hàng mới; Mua nhiều nhất; Khách hàng thân thiết; Tỷ lệ quay lại
        { key: "/admin/statistics/shipping", label: "Vận chuyển" },// Tỷ lệ giao thành công; Thống kê theo đơn vị vận chuyển; Thời gian giao trung bình
      ]
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={256}>
        <Typography.Title level={5} style={{ margin: 16, color: "#fff", textAlign: "center" }}>
          Admin
        </Typography.Title>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/admin/dashboard"]}
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#fff", textAlign: "right", paddingRight: 20 }}>
          <Notification content={content}>
            <Badge count={5}>
              <Button
                shape="circle"
                icon={<BellOutlined style={{ fontSize: "20px" }} />}
                size="large"
                style={{
                  transition: 'transform 0.3s ease',
                  width: "40px",
                  height: "40px",
                }}
                className="floating-setting-btn"
                onClick={() => console.log("click bell")}
              />
            </Badge>
          </Notification>
        </Header>
        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
