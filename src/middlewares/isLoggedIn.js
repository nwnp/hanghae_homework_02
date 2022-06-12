module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    return res.status(401).json({
      result: {
        success: false,
        errorMessage: "이미 로그인한 상태입니다.",
      },
    });
  }
  next();
};
