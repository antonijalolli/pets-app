import axios from "axios";
import { SETTINGS } from "../common/Settings";

export const CountriesRepository = {
  all: (page, size, searchParams) => {
    if (!searchParams) searchParams = {};
    return axios({
      url: `${SETTINGS.API_BASE_URL}countries`,
      method: "GET",
      params: {
        page: page,
        size: size,
        searchParams: searchParams,
      },
    });
  },
  get: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}countries/${id}`,
      method: "GET",
    });
  },
  create: (country) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}countries`,
      method: "POST",
      data: country,
    });
  },

  deleteCountry: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}countries/${id}`,
      method: "DELETE",
    });
  },

  updateCountry: (country) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}countries`,
      method: "PUT",
      data: country,
    });
  },
};
