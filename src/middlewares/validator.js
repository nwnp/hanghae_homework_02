const { validationResult } = require("express-validator");

const registerValidate = (req, res, next) => {
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

module.exports = { registerValidate };
