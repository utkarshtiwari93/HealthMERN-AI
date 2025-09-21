const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Login user & get token
// @access  Public
router.post("/login", loginUser);

// @route   GET /api/users/profile
// @desc    Get logged in user's profile
// @access  Private
router.get("/profile", protect, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update logged in user's profile
// @access  Private
router.put("/profile", protect, updateUserProfile);

module.exports = router;
