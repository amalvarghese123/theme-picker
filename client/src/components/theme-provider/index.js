import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const { theme = "light" } = useSelector((state) => state.user);
  return <div className={`theme-${theme}`}>{children}</div>;
};
export default ThemeProvider;
