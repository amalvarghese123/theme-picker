import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserToken } from "../../data-store/actions/actionCreators";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action to check if the user is logged in
    dispatch(checkUserToken());
  }, [dispatch]);
};

export default useAuth;
