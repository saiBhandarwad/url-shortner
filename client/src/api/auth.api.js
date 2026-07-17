import axiosInstance from "./axios";

export const login = (data) =>
  axiosInstance.post("/auth/login", data);

export const signup = (data) =>
  axiosInstance.post("/user/signup", data);

export const getProfile = () =>
  axiosInstance.get("/auth/me");