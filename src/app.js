const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsConfig = require("./config/corsConfig.json");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");

dotenv.config();
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("mysql connection success");
  })
  .catch((err) => {
    console.error("mysql connection error", err);
  });

const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

app.use("/", indexRouter);
app.use("/api", [userRouter, postRouter]);

app.listen(PORT, () => {
  console.log("The server is on");
});
