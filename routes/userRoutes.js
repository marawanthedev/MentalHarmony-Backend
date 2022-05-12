const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// second arguments is for middle ware functions
// last one is for controllre functionst that connect with db
router.get("/me", protect, getMe);
module.exports = router;
