import axios from "axios";
import { useNavigate } from "react-router";
import { SETTINGS } from "../common/Settings";

export const AuthService = {
  authenticate: (username, password, mfaToken) => {
    if (!mfaToken) mfaToken = null;
    return axios({
      url: `${SETTINGS.API_BASE_URL}auth/authenticate`,
      method: "POST",
      data: {
        username: username,
        password: password,
        mfaToken: mfaToken,
      },
    });
  },

  logout: () => {
    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("me");
    window.location.href = "/signin";
  },

  storeToken: (token) => {
    window.localStorage.setItem("auth", token);
    window.localStorage.setItem("me", JSON.stringify(parseJwt(token)));
  },

  hasRole: (role) => {
    //Return true if current user has role (arg)
    if (!window.localStorage.getItem("me")) return false;
    let meObj = JSON.parse(window.localStorage.getItem("me"));
    if (meObj) {
      if (meObj.roles.filter((r) => r.authority === role).length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  getCurrentUser: () => {
    let meObj = window.localStorage.getItem("me");
    if (meObj) {
      return JSON.parse(meObj);
    } else {
      return null;
    }
  },

  getToken: () => {
    return window.localStorage.getItem("auth");
  },
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
