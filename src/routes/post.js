const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth");

router.get("/post/:id", postController.get);
// router.post("/post", authMiddleware, postController.register);
router.post("/post", authMiddleware, postController.register);

module.exports = router;
