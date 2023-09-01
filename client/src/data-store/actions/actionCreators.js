import {
  CHECK_TOKEN,
  CLEAR_TOKEN,
  GET_THEME,
  LOGIN_USER,
  REGISTER_USER,
  SET_THEME,
} from "./actionTypes";
import apis from "../apis";
import getToken from "../../utils/getToken";
import getErrorMessage from "../../utils/getErrorMessage";

export const getTheme = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await apis.get("/api/v1/user/theme", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: GET_THEME, payload: response.data });
    } catch (error) {
      console.log("error:", error);
    }
  };
};
export const setTheme = ({ theme }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_THEME, payload: theme });
      const token = getToken();
      if (token) {
        const response = await apis.post(
          "/api/v1/user/theme",
          { theme: theme },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.log("error:", error);
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage);
    }
  };
};
export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await apis.post("/api/v1/auth/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("accessToken", response.data?.data?.accessToken);
      dispatch({ type: LOGIN_USER, payload: response.data });
    } catch (error) {
      console.log("error:", error);
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage);
    }
  };
};
export const registerUser = ({ email, password, name, phone }) => {
  return async (dispatch) => {
    try {
      const response = await apis.post("/api/v1/auth/register", {
        name: name,
        email: email,
        password: password,
        phone: phone,
      });
      dispatch({ type: REGISTER_USER });
    } catch (error) {
      console.log("error:", error);
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage);
    }
  };
};
export const checkUserToken = () => {
  return async (dispatch) => {
    const token = getToken();
    try {
      const response = await apis.get("/api/v1/auth/check-token", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data?.success) {
        dispatch({ type: CHECK_TOKEN, payload: response.data });
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
};
export const clearToken = () => {
  return async (dispatch) => {
    localStorage.setItem("accessToken", "");
    dispatch({ type: CLEAR_TOKEN });
  };
};
