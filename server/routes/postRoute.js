const express = require("express");
const { getPosts, newPost, getSinglePost, editPost, deletePost} = require("../controllers/postController")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router();

router.get("/", protect, getPosts);
router.post("/newPost",protect,  newPost);
router.get("/:id", protect, getSinglePost)
router.put("/edit/:id", protect, editPost)
router.delete("/delete/:id", protect, deletePost)


module.exports = router;
