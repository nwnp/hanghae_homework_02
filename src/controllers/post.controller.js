const Post = require("../models/post");
const User = require("../models/user");
const Like = require("../models/like");

const get = async (req, res, next) => {
  try {
    // const pageNum = Number(req.params.id);
    const limit = 10;
    let offset = 0 + (Number(req.params.id) - 1) * limit;
    const result = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nickname"],
        required: false,
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

const detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exPost = await Post.findOne({
      where: { id },
      include: [{ model: Like }],
      required: false,
    });
    if (!exPost) {
      return res.status(404).json({
        result: {
          success: false,
          errorMessage: "존재하지 않는 게시글",
        },
      });
    }

    const likes = exPost.dataValues.Likes;
    const { title, content, image, userId } = exPost.dataValues;
    return res.status(200).json({
      result: {
        success: true,
        likeCount: likes.length,
        title,
        content,
        image,
        userId,
        postId: Number(id),
      },
    });
  } catch (error) {
    return res.status(400).json({
      result: { success: false },
    });
  }
};

module.exports = { get, register, detail };
