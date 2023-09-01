import { toast } from "react-toastify";

const useToastMessage = () => {
  const showToastSuccess = (errorMessage) => {
    toast.success(errorMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };
  const showToastFailure = (errorMessage) => {
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };
  return { showToastFailure, showToastSuccess };
};
export default useToastMessage;
