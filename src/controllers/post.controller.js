const Post = require("../models/post");
const User = require("../models/user");

const get = async (req, res, next) => {
  try {
    // const pageNum = Number(req.params.id);
    const limit = 10;
    let offset = 0 + (Number(req.params.id) - 1) * limit;
    const result = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
      offset: offset,
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const register = async (req, res, next) => {
  try {
    const { title, content, image, userId } = req.body;
    const result = await Post.create({
      title,
      content,
      image,
      userId,
    });
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = { get, register };
