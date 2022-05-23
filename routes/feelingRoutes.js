const express = require("express");
const router = express.Router();

const {
  addFeelingSubmission,
  getFeelings,
} = require("../controllers/feelingController");

// const { protect } = require("../middleware/authMiddleware");

router.post("", addFeelingSubmission);
router.get("", getFeelings);

module.exports = router;
