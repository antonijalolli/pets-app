import axios from "axios";
import { SETTINGS } from "../common/Settings";

export const GroupsRepository = {
  getAll: (page, size) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}groups`,
      method: "GET",
      params: {
        page: page,
        size: size,
      },
    });
  },
  get: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}groups/${id}`,
      method: "GET",
    });
  },
  create: (group) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}groups`,
      method: "POST",
      data: group,
    });
  },

  updateGroup: (id, group) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}groups`,
      method: "PUT",
      data: group,
    });
  },
  deleteGroup: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}groups/${id}`,
      method: "DELETE",
    });
  },
};
