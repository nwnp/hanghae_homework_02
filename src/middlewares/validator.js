const { validationResult } = require("express-validator");

const nicknameValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const result = {
    success: false,
    error:
      "닉네임은 최소 3자 이상이며 알파벳 대소문자, 숫자로 구성되어야 합니다.",
  };
  return res.status(400).json({ result });
};

const emailValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const result = {
    success: false,
    error: "올바른 형식의 이메일을 적어주세요.",
  };
  return res.status(400).json({ result });
};

const passwordValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const result = {
    success: false,
    error: "비밀번호는 최소 4자 이상입니다.",
  };
  return res.status(400).json({ result });
};

module.exports = { nicknameValidate, emailValidate, passwordValidate };
