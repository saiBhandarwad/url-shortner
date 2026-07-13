import { api } from "./api";
export const analyticsService = {
  overview: () => api.get("/analytics/overview"),
  link: (id) => api.get(`/analytics/links/${id}`),
};
