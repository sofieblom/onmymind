const express = require("express");
const { getPosts} = require("../controllers/postController")
// const login = require("../middlewares/loginMiddleware")

const router = express.Router();

router.get("/",  getPosts);

module.exports = router;
