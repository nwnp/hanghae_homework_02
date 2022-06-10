const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/user.controller");
const { body } = require("express-validator");
const { registerValidate } = require("../middlewares/validator");

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
    registerValidate,
  ],
  userRouter.register
);

module.exports = router;
