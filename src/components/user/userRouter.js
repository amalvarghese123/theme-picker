const express = require("express");
const validate = require("../../middlewares/validate");
const { getTheme, setTheme } = require("./userController");
const { setThemeSchema } = require("./userValidation");
const router = express.Router();
const authorize = require("../../middlewares/auth");

router.use(authorize);
router.route("/theme").get(getTheme).post(validate(setThemeSchema), setTheme);

module.exports = router;
