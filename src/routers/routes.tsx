import type { RouteObject } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../pages/client/HomePage";
import CartPage from "../pages/client/CartPage";
import CategoryPage from "../pages/client/CategoryPage";
import OrderHistoryPage from "../pages/client/OrderHistoryPage";
import ProfilePage from "../pages/client/ProfilePage";
import ChangePasswordPage from "../pages/client/ChangePasswordPage";
import DetailProductPage from "../pages/client/DetailProductPage";
import PaymentPage from "../pages/client/PaymentPage";
import LoginPage from "../pages/client/LoginPage";
import RegisterPage from "../pages/client/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import NotificationPage from "../pages/client/NotificationPage";
import AddressPage from "../pages/client/AddressPage";
import ProfileLayout from "../layouts/ProfileLayout";
import VoucherPage from "../pages/client/VoucherPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminProductPage from "../pages/admin/AdminProductPage";
import AdminOrderPage from "../pages/admin/AdminOrderPage";
import AdminUserPage from "../pages/admin/AdminUserPage";
import AdminRevenuePage from "../pages/admin/AdminRevenuePage";
import SupportPage from "../pages/client/SupportPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";

const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/cart", element: <CartPage /> },
            { path: "/category", element: <CategoryPage /> },
            { path: "/product/detail/:id", element: <DetailProductPage /> },
        ],
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/support", element: <SupportPage /> },
    { path: "admin/login", element: <AdminLoginPage/>}
];

const privateRoutes: RouteObject[] = [
    {
        path: "/",
        element: <ProtectedRoute>
            <DefaultLayout />
        </ProtectedRoute>,
        children: [
            { path: "/history", element: <OrderHistoryPage /> },
            {
                path: "/profile",
                element: <ProfileLayout />,
                children: [
                    { path: "info", element: <ProfilePage /> },
                    { path: "address", element: <AddressPage /> },
                    { path: "change-password", element: <ChangePasswordPage /> },
                    { path: "voucher", element: <VoucherPage /> },
                ]
            },
            { path: "payment", element: <PaymentPage /> },
            { path: "notification", element: <NotificationPage /> }
        ],
    },
]
const adminRoutes: RouteObject[] = [
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {path: "dashboard", element: <AdminDashboardPage/>},
            {path: "management/product", element: <AdminProductPage/>},
            {path: "management/order", element: <AdminOrderPage/>},
            {path: "management/user", element: <AdminUserPage/>},
            {path: "statistics/revenue", element: <AdminRevenuePage/>},
        ],
    },
]
export { publicRoutes, privateRoutes, adminRoutes };
