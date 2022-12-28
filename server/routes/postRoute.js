const express = require("express");
const { getPosts, newPost, getSinglePost, editPost} = require("../controllers/postController")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router();

router.get("/", protect, getPosts);
router.post("/newPost",protect,  newPost);
router.get("/:id", protect, getSinglePost)
router.get("/edit/:id", protect, editPost)

module.exports = router;
