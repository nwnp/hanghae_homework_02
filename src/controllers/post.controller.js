const Post = require("../models/post");
const User = require("../models/user");

const get = async (req, res, next) => {
  try {
    const pageNum = Number(req.params.id);
    let offset = pageNum;
    if (pageNum > 1) {
      offset = 0 + (pageNum - 1) * 10;
    }
    const result = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
      offset: offset - 1,
      limit: 10,
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
