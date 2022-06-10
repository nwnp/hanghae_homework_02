const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/user.controller");
const { body } = require("express-validator");
const {
  nicknameValidate,
  emailValidate,
  passwordValidate,
} = require("../middlewares/validator");

// signup
router.post(
  "/register",
  [
    body("nickname")
      .trim()
      .notEmpty()
      .isLength({ min: 3 })
      .bail()
      .matches(/^[A-Za-z0-9]+$/),
    nicknameValidate,
    body("email").trim().notEmpty().bail().isEmail(),
    emailValidate,
    body("password").trim().notEmpty().bail().isLength({ min: 3 }),
    passwordValidate,
  ],
  userRouter.register
);

module.exports = router;
