import { Suspense } from "react";
import "./App.css";
import ErrorBoundary from "./components/error-boundary";
import useAppRoutes from "./routes/useAppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "./hooks/useAuth";
import ThemeProvider from "./components/theme-provider";
import Loader from "./ui-components/loader";

function App() {
  //checking if user is logged in or not
  useAuth();
  const { appRoutes } = useAppRoutes();
  return (
    <div className="app-container">
      <ThemeProvider>
        <ToastContainer />
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>{appRoutes}</Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </div>
  );
}

export default App;
