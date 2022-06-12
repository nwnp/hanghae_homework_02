const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth");

// posts list
router.get("/post/", postController.get);

// post 등록
router.post("/post", authMiddleware, postController.register);

// put 수정
router.put("/post/:id", authMiddleware, postController.update);

// post 삭제
router.delete("/post/:id", authMiddleware, postController.deletePost);

// 특정 post 가져오기
router.get("/post/detail/:id/:userId", postController.detail);

// 좋아요 등록 & 취소
// router.post("/post/:id/like", authMiddleware, postController.like);
router.post("/post/:id/like", authMiddleware, postController.like);

module.exports = router;
