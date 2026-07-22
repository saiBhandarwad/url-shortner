import { CREATELINK, GETALLLINKBYUSER } from "./api";
import axiosInstance from "./axios";

export const createLink = (data) =>
    axiosInstance.post(CREATELINK, data)
export const getAllLinksByUser = (payload) =>
    axiosInstance.post(GETALLLINKBYUSER, payload)