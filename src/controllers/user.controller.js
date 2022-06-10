const { registerValidate } = require("../middlewares/validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { nickname, email, password, passwordCheck } = req.body;

    // password check
    if (password !== passwordCheck) {
      return res.status(400).json({
        result: {
          success: false,
          errorMessage: "비밀번호가 맞지 않습니다.",
        },
      });
    }

    // email 중복체크
    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) {
      return res.status(400).json({
        result: {
          success: false,
          errorMessage: "이미 존재하는 회원입니다.",
        },
      });
    }

    // nickname 중복체크
    const existNickname = await User.findOne({ where: { nickname } });
    if (existNickname) {
      return res.status(400).json({
        result: {
          success: false,
          errorMessage: "이미 존재하는 닉네임입니다.",
        },
      });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      nickname,
      email,
      password: hashedPassword,
    });
    const result = {
      id: newUser.id,
      nickname: newUser.nickname,
      email: newUser.email,
    };
    return res.status(200).json({ result });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  register,
};
