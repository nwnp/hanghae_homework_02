const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const { id } = jwt.verify(authorization, process.env.MY_SECRET_KEY);
    User.findOne({ where: { id } }).then((user) => {
      res.locals.user = user.dataValues;
      next();
    });
  } catch (err) {
    return res.status(401).send({
      result: {
        success: false,
        errorMessage: "로그인이 필요합니다.",
      },
    });
  }
};
