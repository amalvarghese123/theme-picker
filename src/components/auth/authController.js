const catchError = require("../../utils/catch-error");
const authService = require("./authService");

const AuthService = new authService();

exports.registerUser = catchError(async (req, res, next) => {
  const registeredUser = await AuthService.registerUser({ reqBody: req.body });
  const { name, email, _id } = registeredUser;
  res.status(201).json({ success: true, data: { name, email, _id } });
});

exports.loginUser = catchError(async (req, res, next) => {
  const loggedInUser = await AuthService.loginUser({ reqBody: req.body });
  res.status(201).json({ success: true, data: loggedInUser });
});
exports.checkToken = catchError(async (req, res, next) => {
  const loggedInUser = await AuthService.checkToken({ user: req.user });
  res.status(201).json({ success: true, data: loggedInUser });
});
