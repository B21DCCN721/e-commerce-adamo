/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig, AxiosError, type AxiosResponse } from "axios";

// Custom type để thêm _retry flag vào config
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Kiểu của request bị queue lại nếu đang refresh token
type FailedRequest = {
  resolve: (value?: AxiosResponse) => void;
  reject: (error: any) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, tokenRefreshed = false) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (tokenRefreshed) resolve(); else reject(error);
  });
  failedQueue = [];
};

// axios chính để gọi API (gửi kèm cookies)
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axios raw chỉ dùng để gọi refresh hoặc logout riêng biệt
const rawAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Logout user và redirect về login
const handleLogout = async () => {
  try {
    await rawAxios.post("/api/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("/login");
  }
};

// Interceptor xử lý lỗi response
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh-token")
    ) {
      if (isRefreshing) {
        // Nếu đang refresh thì chờ kết quả
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosClient(originalRequest)) // gọi lại request
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await rawAxios.post("/api/auth/refresh-token");

        processQueue(null, true); // resolve các request đang chờ
        return axiosClient(originalRequest); // gọi lại request ban đầu
      } catch (refreshErr) {
        processQueue(refreshErr, false);
        await handleLogout(); // chuyển về login nếu refresh fail
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    // Nếu là lỗi refresh-token → logout luôn
    if (
      error.response?.status === 403 &&
      originalRequest.url?.includes("/auth/refresh-token")
    ) {
      await handleLogout();
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
