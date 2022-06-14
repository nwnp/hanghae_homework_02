const Post = require("../models/post");
const Like = require("../models/like");
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

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
    const { title, content } = req.body;
    const userId = res.locals.user.id;
    const result = await Post.create({
      title,
      content,
      userId,
      image: req.file.location,
      imageKey: req.file.key,
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
    const paramUserId = res.locals.user.id;
    const checkPost = await Post.findOne({
      where: { id },
      include: [{ model: Like }],
    });
    if (!checkPost) {
      return res.status(404).json({
        result: {
          success: false,
          errorMessage: "존재하지 않는 게시글",
        },
      });
    }

    const exPost = await Post.findOne({
      where: { id },
      include: [{ model: Like, where: { userId: paramUserId } }],
    });

    if (!exPost) {
      const likeByMe = false;
      const likes = checkPost.dataValues.Likes;
      const { title, content, image, userId } = checkPost.dataValues;
      return res.status(200).json({
        result: {
          success: true,
          likeCount: likes.length,
          title,
          content,
          image,
          userId,
          postId: Number(id),
          likeByMe,
        },
      });
    }

    const likes = checkPost.dataValues.Likes;
    const likeByMe = likes[0].dataValues.userId === paramUserId ? true : false;
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
        likeByMe,
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
  const postId = Number(req.params.id);
  const userId = res.locals.user.id;
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
        message: "좋아요 성공",
        userId: result.userId,
        postId: result.postId,
      },
    });
  } else {
    await Like.destroy({ where: { postId } });
    return res
      .status(201)
      .json({ result: { success: true, message: "좋아요 취소" } });
  }
};

// DELETE post delete
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = res.locals.user.id;
    const post = await Post.findOne({ where: { id } });
    // 게시글이 존재하지 않을 때
    if (!post) {
      return res.status(400).json({
        result: {
          success: true,
          errorMessage: "존재하지 않는 게시글",
        },
      });
    }
    // 관리자일 때
    if (res.locals.user.role === "admin") {
      // S3 내 이미지 삭제
      s3.deleteObject(
        {
          Bucket: "jinsfirstbucket",
          Key: post.dataValues.imageKey,
        },
        (err, data) => {
          if (err) {
            throw err;
          }
          console.log("s3 deleteObject ", data);
        }
      );
      await Post.destroy({ where: { id } });
      return res.status(201).json({
        result: {
          success: true,
          message: "관리자의 권한으로 삭제합니다.",
        },
      });
    }
    // 다른 유저의 게시글을 삭제하려고 할 때
    if (Number(userId) !== post.dataValues.userId) {
      return res.status(401).json({
        result: {
          success: false,
          errorMessage: "다른 회원의 게시글은 삭제할 수 없습니다.",
        },
      });
    }

    // S3 내 이미지 삭제
    s3.deleteObject(
      {
        Bucket: "jinsfirstbucket",
        Key: post.dataValues.imageKey,
      },
      (err, data) => {
        if (err) {
          throw err;
        }
        console.log("s3 deleteObject ", data);
      }
    );
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
    const { id } = req.params;
    const userId = res.locals.user.id;
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

    await Post.update({ title, content, image }, { where: { id } });
    return res.status(200).json({ result: { success: true } });
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
