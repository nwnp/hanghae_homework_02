const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");
const {
  nicknameValidate,
  emailValidate,
  passwordValidate,
} = require("../middlewares/validator");
const isLoggedIn = require("../middlewares/isLoggedIn");

// signup
/**
 * @swagger
 * /api/register:
 *   post:
 *     description: 회원가입
 *     tags: [User]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "nickname"
 *       type: "string"
 *     - name: "password"
 *       type: "string"
 *     - name: "passwordCheck"
 *       type: "string"
 *     - name: "email"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *
 */
router.post(
  "/register",
  isLoggedIn,
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
    body("password").trim().notEmpty().bail().isLength({ min: 4 }),
    passwordValidate,
  ],
  userController.register
);

// login
/**
 * @swagger
 * /api/login:
 *   post:
 *     description: 로그인
 *     tags: [User]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "email"
 *       type: "string"
 *     - name: "password"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *
 */
router.post("/login", isLoggedIn, userController.login);

module.exports = router;
