const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers & req.headers.token;
  if (token) {
    return res.status(401).json({
      result: {
        success: false,
        errorMessage: "이미 로그인한 상태입니다.",
      },
    });
  }
  next();
};
