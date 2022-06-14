const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth");
const dto = require("../middlewares/detail.dto");
const upload = require("../modules/upload");

// posts list
/**
 * @swagger
 * /api/post:
 *   get:
 *     description: 게시글 목록 불러오기
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *
 */
router.get("/post", postController.get);

// post 등록
/**
 * @swagger
 * /api/post/register:
 *   post:
 *     description: 게시글 등록
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "title"
 *       type: "string"
 *     - name: "content"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *
 */
router.post(
  "/post",
  authMiddleware,
  upload.single("image"),
  postController.register
);

// put 수정
/**
 * @swagger
 * /api/post:
 *   put:
 *     description: 게시글 수정
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "title"
 *       type: "string"
 *     - name: "content"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *
 */
router.put("/post/:id", authMiddleware, postController.update);

// post 삭제
/**
 * @swagger
 * /api/post/:id:
 *   delete:
 *     description: 게시글 삭제
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *
 */
router.delete("/post/:id", authMiddleware, postController.deletePost);

// 특정 post 가져오기
/**
 * @swagger
 * /api/post/detail/:id:
 *   get:
 *     description: 특정 게시글 불러오기
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *
 */
router.get("/post/detail/:id", dto, postController.detail);

// 좋아요 등록 & 취소
// router.post("/post/:id/like", authMiddleware, postController.like);
/**
 * @swagger
 * /api/post/:id/like:
 *   post:
 *     description: 게시글 좋아요 & 좋아요 취소 API
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *
 */
router.post("/post/:id/like", authMiddleware, postController.like);

module.exports = router;
