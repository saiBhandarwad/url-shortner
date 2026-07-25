import { GETANALYTICS } from "./api";
import axiosInstance from "./axios";

export const getAnalytics = () => {
    return axiosInstance.get(GETANALYTICS)
}