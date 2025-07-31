import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FloatButton } from "antd";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Auto scroll khi chuyển trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <FloatButton.BackTop />
    </>
  );
};

export default ScrollToTop;
