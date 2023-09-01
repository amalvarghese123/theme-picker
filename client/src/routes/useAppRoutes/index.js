import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "../../pages/home-page";

const Login = lazy(() => import("../../pages/login"));
const Register = lazy(() => import("../../pages/register"));

const useAppRoutes = () => {
  const routes = [
    {
      index: true,
      path: "/",
      element: <HomePage />,
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ];
  const appRoutes = useRoutes(routes);
  return { appRoutes };
};
export default useAppRoutes;
