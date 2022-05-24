const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addBooking,
  getBookings,
  attachBookingMeetingLink,
  reviewBooking,
} = require("../controllers/bookingController");

router.get("", getBookings);
router.post("", protect, addBooking);
router.post("/attachLink", attachBookingMeetingLink);
router.post("/review", reviewBooking);

module.exports = router;

