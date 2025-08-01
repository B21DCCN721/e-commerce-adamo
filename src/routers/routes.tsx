import type { RouteObject } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import CategoryPage from "../pages/CategoryPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import ProfilePage from "../pages/ProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import DetailProductPage from "../pages/DetailProductPage";
import PaymentPage from "../pages/PaymentPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import NotificationPage from "../pages/NotificationPage";
import AddressPage from "../pages/AddressPage";
import ProfileLayout from "../layouts/ProfileLayout";
import VoucherPage from "../pages/VoucherPage";
// import ProtectedRoute from "./ProtectedRoute";

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
export { publicRoutes, privateRoutes };
