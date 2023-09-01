import { applyMiddleware, createStore, combineReducers } from "redux";
import userReducer from "../reducer/userReducer";
import thunk from "redux-thunk";

const configureStore = () => {
  const rootReducer = combineReducers({
    user: userReducer,
  });
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};
export default configureStore;
