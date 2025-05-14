import { API } from "../instance";

export const AnilibriaApi = {
  getSchedule: () => API.get("/title/schedule"),
  getUpdates: (page?: any) => API.get(`/title/updates?page=${page}`),
  getTitle: (id: any) => API.get(`/title?id=${id}`),
  searchTitle: (params: any) => API.get(`/title/search`, { params }),
  getRandom: () => API.get("/title/random"),
};
