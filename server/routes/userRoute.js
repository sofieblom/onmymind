const express = require("express");
const { getUser, createUser, getUserById, loginUser} = require("../controllers/userController")
const { protect } = require("../middlewares/authMiddleware")
const router = express.Router();

router.get("/me", protect, getUser);
router.post("/register", createUser);
// router.get("/:id", getUserById)
router.post("/login", loginUser)

module.exports = router;

