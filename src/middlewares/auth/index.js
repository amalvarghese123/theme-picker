const jwt = require("jsonwebtoken");
const User = require("../../components/user/userModel");
const {
  Unauthorized,
  DocumentNotFound,
} = require("../../errors/error-classes/errorClasses");

const auth = async (req, res, next) => {
  let accessToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      accessToken = req.headers.authorization.split(" ")[1];
      const decodedPayload = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY
      );
      const user = await User.findById(decodedPayload._id).select("-password");
      if (!user) throw new DocumentNotFound("User doesn't exist in database");
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  }

  if (!accessToken) next(new Unauthorized("Login to access this api endpoint"));
};

module.exports = auth;
