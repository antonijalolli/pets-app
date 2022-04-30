import axios from "axios";
import { SETTINGS } from "../common/Settings";

export const AttributeTypeRepository = {
  all: (page, size) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}attributeTypes`,
      method: "GET",
      params: {
        page: page,
        size: size,
      },
    });
  },
  get: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}attributeTypes/${id}`,
      method: "GET",
    });
  },
  create: (attributeType) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}attributeTypes`,
      method: "POST",
      data: attributeType,
    });
  },

  updateGroup: (attributeType) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}attributeTypes`,
      method: "PUT",
      data: attributeType,
    });
  },
};
