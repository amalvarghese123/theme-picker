const express = require("express");
const authRouter = require("../../components/auth/authRouter");
const userRouter = require("../../components/user/userRouter");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
module.exports = router;
