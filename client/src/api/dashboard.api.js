import { GETDASHBOARD } from "./api";
import axiosInstance from "./axios";

export const getDashboard = () => {
    return axiosInstance.get(GETDASHBOARD)
}