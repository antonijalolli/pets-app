import axios from "axios";
import { SETTINGS } from "../common/Settings";

export const PrivilegesRepository = {
  getAll: (page, size) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}privileges`,
      method: "GET",
      params: {
        page: page,
        size: size,
      },
    });
  },
  get: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}privileges/${id}`,
      method: "GET",
    });
  },
};
