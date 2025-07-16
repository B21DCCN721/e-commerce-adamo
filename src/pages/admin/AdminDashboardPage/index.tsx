import { Divider, Typography } from "antd";
import OverviewCards from "../../../components/admin/OverviewCards";
import { RecentOrders } from "../../../components/admin/RecentOrders";
import { LowStockProducts } from "../../../components/admin/LowStockProducts";
import { ShippingSchedule } from "../../../components/admin/ShippingSchedule";
import { NewCustomers } from "../../../components/admin/NewCustomers";

const AdminDashboardPage = () => {
    return (
        <>
            <Typography.Title level={4}>Tổng quan</Typography.Title>
            <OverviewCards />
            <Divider/>
            <Typography.Title level={4}>Đơn hàng gần đây</Typography.Title>
            <RecentOrders/>
            <Divider/>
            <Typography.Title level={4}>Sản phẩm bán chạy</Typography.Title>
            <LowStockProducts/>
            <Divider/>
            <Typography.Title level={4}>Lịch giao hàng</Typography.Title>
            <ShippingSchedule/>
            <Divider/>
            <Typography.Title level={4}>Khách hàng mới</Typography.Title>
            <NewCustomers/>
        </>
    )
}
export default AdminDashboardPage;