const asyncHandler = require("express-async-handler");
const assert = require("../helpers/assertion");
const BookingService = require("../services/bookingService");
const bookingObject = new BookingService();

const getBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingObject.getBookings();
  assert(bookings, bookings, "Booking retrieval failed", res);
});
const addBooking = asyncHandler(async (req, res) => {
  const { serviceProvider } = req.body;
  // students id, user who is logged in and token is provided to headers
  const { _id } = req.user;
  const booking = await bookingObject.addBooking(_id, serviceProvider);
  assert(booking, booking, "Booking addition failed", res);
});
const reviewBooking = asyncHandler(async (req, res) => {
  const { bookingId, rate } = req.body;
  const reviewedBooking = await bookingObject.reviewBooking(bookingId, rate);
  assert(reviewedBooking, reviewedBooking, "Booking addition failed", res);
});

const attachBookingMeetingLink = asyncHandler(async (req, res) => {
  const { bookingId, meeting_link } = req.body;
  const bookingWithAttachedLink = await bookingObject.attachBookingMeetingLink(
    bookingId,
    meeting_link
  );
  assert(
    bookingWithAttachedLink,
    bookingWithAttachedLink,
    "Booking addition failed",
    res
  );
});

module.exports = {
  getBookings,
  addBooking,
  reviewBooking,
  attachBookingMeetingLink,
};
