const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth");

router.get("/post/:id", postController.get);
// router.post("/post", authMiddleware, postController.register);
router.post("/post", postController.register);
router.get("/post/detail/:id", postController.detail);
router.post("/post/:id/like", postController.like);

module.exports = router;
