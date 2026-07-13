import { api } from "./api";
export const linkService = {
  create: (data) => api.post("/links", data),
  list: (params) => api.get("/links", { params }),
  remove: (id) => api.delete(`/links/${id}`),
};
