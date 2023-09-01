const getErrorMessage = (err) => {
  console.log("error:", err);
  const errorMessage =
    err?.response?.data?.error?.message || err?.message || "An error occured";
  return errorMessage;
};
export default getErrorMessage;
