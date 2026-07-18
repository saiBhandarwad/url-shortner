import axiosInstance from "./axios";

export const login = (data) =>
  axiosInstance.post("/user/login", data);

export const signup = (data) =>
  axiosInstance.post("/user/signup", data);

export const getMe = () =>
    axiosInstance.get("/user/me");

export const refreshUser = () =>
    axiosInstance.post("/user/refresh")