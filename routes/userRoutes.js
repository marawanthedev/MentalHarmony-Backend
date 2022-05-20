const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  getUserByType,
  getUser,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/filter", getUserByType);
router.get("/getUser", protect, getUser);
router.put("/update", protect, updateUser);

// second arguments is for middle ware functions
// last one is for controller functions that connect with db
router.get("/me", protect, getMe);

module.exports = router;
