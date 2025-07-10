import { Navigate, useLocation } from "react-router-dom";
import { notification } from "antd";
import { useRef } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true" ||
    sessionStorage.getItem("isAuthenticated") === "true";
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  const location = useLocation();

  // Dùng ref để đảm bảo noti chỉ hiện 1 lần
  const notified = useRef(false);

  if (!isAuthenticated) {
    if (!notified.current) {
      notification.warning({
        message: "Chưa đăng nhập",
        description: "Vui lòng đăng nhập để tiếp tục.",
        placement: "topRight",
      });
      notified.current = true;
    }
    return <Navigate to="/login" replace />;
  }

  if (role === "user" && location.pathname.startsWith("/admin")) {
    if (!notified.current) {
      notification.warning({
        message: "Không có quyền truy cập",
        description: "Bạn không được phép truy cập trang admin.",
        placement: "topRight",
      });
      notified.current = true;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
