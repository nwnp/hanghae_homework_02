const Post = require("../models/post");
const Like = require("../models/like");

// GET All posts
const get = async (req, res, next) => {
  try {
    const posts = await Post.findAll({});
    posts.reverse(); // 최신순으로 등록된 게시글을 출력하기 위해 reverse()
    return res.status(200).json({ result: posts });
  } catch (error) {
    console.error(error);
  }
};

// POST post register
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

// GET 특정 post
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

// POST like
const like = async (req, res, next) => {
  // 되어 있으면 좋아요 취소
  const postId = Number(req.params.id);
  const { userId } = req.body;
  const post = await Post.findOne({
    include: {
      model: Like,
      attributes: ["userId", "postId"],
      where: { userId: userId },
    },
    where: { id: postId },
  });

  if (post === null) {
    const result = await Like.create({ userId, postId });
    return res.status(200).json({
      result: {
        success: true,
        result,
      },
    });
  } else {
    const result = await Like.destroy({ where: { postId } });
    return res.status(201).json({ result });
  }
};

// DELETE post delete
const deletePost = async (req, res, next) => {
  try {
    const { id, userId } = req.params;
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(400).json({
        result: {
          success: true,
          errorMessage: "존재하지 않는 게시글",
        },
      });
    }

    if (Number(userId) !== post.dataValues.userId) {
      return res.status(401).json({
        result: {
          success: false,
          errorMessage: "다른 회원의 게시글은 삭제할 수 없습니다.",
        },
      });
    }

    await Post.destroy({ where: { id } });

    return res.status(200).json({
      result: {
        success: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

// PUT post update
const update = async (req, res, next) => {
  try {
    const { id, userId } = req.params;
    const { title, content, image } = req.body;
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(400).json({
        result: {
          success: true,
          errorMessage: "존재하지 않는 게시글",
        },
      });
    }

    if (Number(userId) !== post.dataValues.userId) {
      return res.status(401).json({
        result: {
          success: false,
          errorMessage: "다른 회원의 게시글은 수정할 수 없습니다.",
        },
      });
    }

    const updatedPost = await Post.update(
      { title, content, image },
      { where: { id } }
    );
    return res.status(200).json({ updatedPost });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  get,
  register,
  detail,
  like,
  deletePost,
  update,
};
