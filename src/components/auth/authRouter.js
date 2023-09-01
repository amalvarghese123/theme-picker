const express = require("express");
const validate = require("../../middlewares/validate");
const { registerUser, loginUser, checkToken } = require("./authController");
const { registerUserSchema, loginUserSchema } = require("./authValidation");
const authorize = require("../../middlewares/auth");
const router = express.Router();

router.route("/register").post(validate(registerUserSchema), registerUser);
router.route("/login").post(validate(loginUserSchema), loginUser);
router.route("/check-token").get(authorize, checkToken);

module.exports = router;
