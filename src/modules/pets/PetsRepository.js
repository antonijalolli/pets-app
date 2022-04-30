import axios from "axios";
import { SETTINGS } from "../common/Settings";

export const PetsRepository = {
  all: (page, size, searchParams) => {
    if (!searchParams) searchParams = {};
    return axios({
      url: `${SETTINGS.API_BASE_URL}pets`,
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
      url: `${SETTINGS.API_BASE_URL}pets/${id}`,
      method: "GET",
    });
  },
  create: (pet) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}pets`,
      method: "POST",
      data: pet,
    });
  },

  deletePet: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}pets/${id}`,
      method: "DELETE",
    });
  },

  updatePet: (pet) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}pets`,
      method: "PUT",
      data: pet,
    });
  },
  filterPets: (countryID, page, size) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}pets/filter`,
      method: "GET",
      params: {
        countryID: countryID,
        page: page,
        size: size,
      },
    });
  },
  uploadPictures: (petId, pictureType, files) => {
    let data = new FormData();
    Object.keys(files).forEach((key) => data.append("files", files[key]));
    if (!pictureType) pictureType = "OTHER";
    return axios({
      url: `${SETTINGS.API_BASE_URL}pets/uploadPetImage/${petId}`,
      data: data,
      method: "PUT",
      params: {
        pictureType: pictureType,
      },
    });
  },
  removePicture: (petId, picture) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}pets/removePicture/${petId}`,
      method: "DELETE",
      data: picture,
    });
  },
  pictureTypes: () => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}pets/pictureTypes`,
      method: "GET",
    });
  },
  updatePictureType: (petId, pictureId, pictureType) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}pets/updatePictureType/${petId}`,
      method: "PUT",
      params: {
        pictureId: pictureId,
        pictureType: pictureType,
      },
    });
  },
};
