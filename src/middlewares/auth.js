const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");
  console.log(authToken);

  if (!authToken || authType !== "Bearer") {
    return res.status(401).send({
      errorMessage: "로그인이 필요합니다.",
    });
  }

  try {
    const { userId } = jwt.verify(authToken, process.env.MY_SECRET_KEY);
    User.findById(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).send({
      errorMessage: "로그인이 필요합니다.",
    });
  }
};
