const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserByType,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/filter", getUserByType);
router.get("/getUser", protect, getUser);
router.put("/update", protect, updateUser);
router.delete("/deleteUser", protect, deleteUser); 

// second arguments is for middle ware functions

module.exports = router;
