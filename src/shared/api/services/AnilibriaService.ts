import { API } from "../instance";

export const AnilibriaApi = {
  getUpdates: (page?: any) => API.get(`/title/updates?page=${page}`),
  getTitle: (id: any) => API.get(`/anime/releases/${id}/`),
  searchTitle: (params: any) => API.get(`/app/search/releases`, { params }),
  getRandom: () => API.get("/anime/releases/random?limit=1"),
  getCatalog: () => API.get("/anime/catalog/releases/"),
  getFranchises: (id: any) => API.get(`/anime/franchises/release/${id}/`),
  getSchedule: () => API.get("/anime/schedule/week/"),
};
