const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    if (res.locals.user) {
      return res.status(400).json({
        result: {
          success: false,
          errorMessage: "이미 로그인한 상태입니다.",
        },
      });
    }

    const { nickname, email, password, passwordCheck } = req.body;

    // password check
    if (password !== passwordCheck) {
      return res.status(401).json({
        result: {
          success: false,
          errorMessage: "비밀번호가 맞지 않습니다.",
        },
      });
    }

    // password에 nickname값이 있는지 체크
    if (password.includes(nickname)) {
      return res.status(401).json({
        result: {
          success: false,
          errorMessage: "닉네임이 들어간 패스워드는 사용할 수 없습니다.",
        },
      });
    }

    // email 중복체크
    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) {
      return res.status(401).json({
        result: {
          success: false,
          errorMessage: "이미 존재하는 회원입니다.",
        },
      });
    }

    // nickname 중복체크
    const existNickname = await User.findOne({ where: { nickname } });
    if (existNickname) {
      return res.status(401).json({
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
    return res.status(201).json({ result });
  } catch (err) {
    console.error(err);
  }
};

const login = async (req, res, next) => {
  try {
    if (res.locals.user) {
      return res.status(404).json({
        result: {
          success: false,
          errorMessage: "이미 로그인한 상태입니다.",
        },
      });
    }

    const { email, password } = req.body;

    // email check
    const exUser = await User.findOne({ where: { email } });
    if (!exUser) {
      return res.status(401).json({
        result: {
          success: false,
          errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
        },
      });
    }

    const matched = bcrypt.compareSync(password, exUser.password);
    if (matched) {
      const user = {
        id: exUser.dataValues.id,
        nickname: exUser.dataValues.nickname,
        email: exUser.dataValues.email,
      };
      const token = jwt.sign({ ...user }, process.env.MY_SECRET_KEY);
      res.locals.user = {
        ...user,
        token,
      };
      return res.status(200).json({
        result: {
          success: true,
          token,
        },
      });
    } else {
      return res.status(401).json({
        result: {
          success: false,
          errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  register,
  login,
};
