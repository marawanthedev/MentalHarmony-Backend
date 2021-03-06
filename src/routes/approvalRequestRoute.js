const express = require("express");
const router = express.Router();

const {
  getApprovalRequests,
  acceptApprovalRequest,
} = require("../controllers/approvalRequestController");

const { protect } = require("../middleware/authMiddleware");

router.get("", protect, getApprovalRequests);
router.post("/accept", acceptApprovalRequest);

module.exports = router;
