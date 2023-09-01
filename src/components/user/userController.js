const catchError = require("../../utils/catch-error");
const userService = require("./userService");

const UserService = new userService();

exports.getTheme = catchError(async (req, res, next) => {
  const theme = await UserService.getTheme({ user: req.user });
  res.status(201).json({ success: true, data: theme });
});
exports.setTheme = catchError(async (req, res, next) => {
  const updatedUser = await UserService.setTheme({
    reqBody: req.body,
    user: req.user,
  });
  res.status(201).json({ success: true, data: { theme: updatedUser.theme } });
});
