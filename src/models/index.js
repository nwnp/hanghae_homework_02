const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// database model
const User = require("./user.js");
const Post = require("./post");
const Like = require("./like");
const Image = require("./image");

// db setting
const db = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
};
const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
});

db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.Like = Like;
db.Image = Image;

User.init(sequelize);
Post.init(sequelize);
Like.init(sequelize);
Image.init(sequelize);

User.associate(db);
Post.associate(db);
Like.associate(db);
Image.associate(db);

module.exports = db;
