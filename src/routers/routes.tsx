import type { RouteObject } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import CatogoryPage from "../pages/CatogoryPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import ProfilePage from "../pages/ProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import DetailProductPage from "../pages/DetailProductPage";
import PaymentPage from "../pages/PaymentPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminManamentProductPage from "../pages/admin/AdminManagementProductPage";
import AdminDetailProductPage from "../pages/admin/AdminDetailProductPage";
import IntroPage from "../pages/admin/IntroPage";
import AdminOrderListPage from "../pages/admin/AdminOrderListPage";
import AdminDetailOrderPage from "../pages/admin/AdminDetailOrderPage";
import AdminImportProductPage from "../pages/admin/AdminImportProductPage";
import ProtectedRoute from "./ProtectedRoute";
import NotificationPage from "../pages/NotificationPage";
import AddressPage from "../pages/AddressPage";
import ProfileLayout from "../layouts/ProfileLayout";
// import ProtectedRoute from "./ProtectedRoute";

const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/cart", element: <CartPage /> },
            { path: "/catogory", element: <CatogoryPage /> },
            { path: "/product/detail/:id", element: <DetailProductPage /> },
        ],
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
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
            { path: "", element: <IntroPage /> },
            { path: "dashboard", element: <AdminDashboardPage /> },
            { path: "management/product", element: <AdminManamentProductPage /> },
            { path: "management/product/:id", element: <AdminDetailProductPage /> },
            { path: "management/order", element: <AdminOrderListPage /> },
            { path: "management/order/:id", element: <AdminDetailOrderPage /> },
            { path: "management/import", element: <AdminImportProductPage /> },
        ],
    },
]
export { publicRoutes, privateRoutes, adminRoutes };
