import {
  CHECK_TOKEN,
  CLEAR_TOKEN,
  GET_THEME,
  LOGIN_USER,
  REGISTER_USER,
  SET_THEME,
} from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
  theme: "light",
  user: null,
  isLoggedIn: false,
};
const userReducer = (state = initialState, { type, payload }) => {
  console.log({ payload });
  switch (type) {
    case GET_THEME:
      return { ...state, theme: payload.data };
    case SET_THEME:
      return { ...state, theme: payload };
    case LOGIN_USER:
      return {
        ...state,
        user: payload.data,
        isLoggedIn: true,
        theme: payload.data.theme || "light",
      };
    case REGISTER_USER:
      return state;
    case CHECK_TOKEN:
      return {
        ...state,
        isLoggedIn: true,
        theme: payload.data.theme || "light",
        user: payload.data,
      };
    case CLEAR_TOKEN:
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};
export default userReducer;
