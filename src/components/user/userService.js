const User = require("./userModel");

class UserService {
  async getTheme({ user }) {
    const existingUser = await User.findById(user._id);
    return existingUser.theme;
  }
  async setTheme({ reqBody, user }) {
    const { theme } = reqBody;
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { theme: theme },
      { new: true }
    );
    return updatedUser;
  }
}
module.exports = UserService;
