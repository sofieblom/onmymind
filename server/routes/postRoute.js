const express = require("express");
const { getPosts, newPost} = require("../controllers/postController")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router();

router.get("/", protect, getPosts);
router.post("/newPost",protect,  newPost);

module.exports = router;
