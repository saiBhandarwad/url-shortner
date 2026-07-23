import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_V1,
  withCredentials: true,
});
// add token in authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
// if token expired then refresh it using refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log({ originalRequest });

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest.url === "/user/refresh") {
      return Promise.reject(error);
    }
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL_V1}/user/refresh`,
          {},
          { withCredentials: true }
        );
        if (response.data.success) {
          localStorage.setItem(
            "accessToken",
            response.data.data.accessToken
          );
          originalRequest.headers.Authorization =
            `Bearer ${response.data.data.accessToken}`;
        }
        return axiosInstance(originalRequest);

      } catch (error) {
        localStorage.removeItem("accessToken");
        if (originalRequest.url !== "/user/login") {
          window.location.replace("/login");
        }
        toast.error(error.response.data.message || "Session expired")
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;