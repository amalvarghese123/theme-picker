const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  DocumentAlreadyExist,
  DocumentNotFound,
  BadRequest,
} = require("../../errors/error-classes/errorClasses");
const User = require("../user/userModel");

class AuthService {
  async registerUser({ reqBody }) {
    const { password, email, phone } = reqBody;
    await this.checkIfUserAlreadySignedUp({ phone, email });
    const hashedPassword = await this.generateHashedPassword(password);
    const signedUpUser = new User({ ...reqBody, password: hashedPassword });
    await signedUpUser.save();
    return signedUpUser;
  }

  async checkIfUserAlreadySignedUp({ phone, email }) {
    const isUserAlreadySignedUp = await User.findOne({
      $expr: { $or: [{ $eq: ["$phone", phone] }, { $eq: ["$email", email] }] },
    });
    if (isUserAlreadySignedUp) {
      throw new DocumentAlreadyExist(
        "User signed up already using the given email/phone"
      );
    }
  }

  async generateHashedPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async loginUser({ reqBody }) {
    const { email, password } = reqBody;
    const loggedInUser = await this.checkLoginCredentials({ email, password });
    const payload = { _id: loggedInUser._id };
    const accessToken = this.generateAccessToken(payload);
    await this.updateRefreshTokenOnLogin(loggedInUser, payload);
    const { name, _id, theme } = loggedInUser;
    return { name, _id, theme, email, accessToken };
  }

  async updateRefreshTokenOnLogin(loggedInUser, payload) {
    const isRefreshTokenValid =
      loggedInUser.refreshToken &&
      !this.isTokenExpired(loggedInUser.refreshToken);
    if (!isRefreshTokenValid) {
      const refreshToken = this.generateRefreshToken(payload);
      loggedInUser.refreshToken = refreshToken;
      await loggedInUser.save();
    }
  }

  async checkLoginCredentials({ email, password }) {
    const user = await User.findOne({ email: email }).select("-refreshToken");
    if (!user) throw new DocumentNotFound("User with given email not found");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new BadRequest("Invalid password");
    return user;
  }
  async checkToken({ user }) {
    const userDoc = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!userDoc) throw new DocumentNotFound("User not found");
    return userDoc;
  }

  generateAccessToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
    return accessToken;
  }

  generateRefreshToken(payload) {
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });
    return refreshToken;
  }

  isTokenExpired(token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return true;
      }
    }
    return false;
  }
}
module.exports = AuthService;
