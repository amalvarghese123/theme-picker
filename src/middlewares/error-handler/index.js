const errorHandler = (err, req, res, next) => {
  console.log("err:", err);
  res
    .status(err.statusCode || 444)
    .json({
      success: false,
      error: { message: err.message, code: err.code, stack: err.stack },
    });
};
module.exports = errorHandler;
