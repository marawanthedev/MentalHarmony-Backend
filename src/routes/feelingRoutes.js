const express = require("express");
const router = express.Router();

const {
  addFeelingSubmission,
  getFeelings,
} = require("../controllers/feelingController");

router.post("", addFeelingSubmission);
router.get("", getFeelings);

module.exports = router;
