const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addBooking,
  getBookings,
  attachBookingMeetingLink,
  rateBooking,
  getUserBookings,
  acceptBooking,
  declineBooking,
  completeBooking,
} = require("../controllers/bookingController");

router.get("", getBookings);
router.get("/currentUser", protect, getUserBookings);
router.post("", protect, addBooking);
router.post("/attachLink", attachBookingMeetingLink);
router.post("/rate", rateBooking);
router.post("/accept", acceptBooking);
router.post("/complete", completeBooking);
// router.post("/decline", declineBooking);

module.exports = router;
