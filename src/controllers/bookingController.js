const asyncHandler = require("express-async-handler");
const assert = require("../helpers/assertion");
const BookingService = require("../services/bookingService");
const bookingObject = new BookingService();

const getBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingObject.getBookings();
  assert(bookings, bookings, "Booking retrieval failed", res);
});
const getUserBookings = asyncHandler(async (req, res) => {
  const { _id, type } = req.user;
  const bookings = await bookingObject.getBookings();
  //needs further refactoring if possible
  const userBookings = [];

  if (bookings.length > 0) {
    bookings.forEach((booking) => {
      if (type === "student")
        if (booking.student._id.toString() === _id.toString())
          userBookings.push(booking);

      if (type === "serviceprovider")
        if (booking.serviceProvider._id.toString() === _id.toString())
          userBookings.push(booking);
    });
  }
  assert(userBookings, userBookings, "User Booking retrieval failed", res);
});
const addBooking = asyncHandler(async (req, res) => {
  const { serviceProvider } = req.body;
  // students id, user who is logged in and token is provided to headers
  const { _id } = req.user;
  const booking = await bookingObject.addBooking(_id, serviceProvider);
  assert(booking, booking, "Booking addition failed", res);
});

const rateBooking = asyncHandler(async (req, res) => {
  const { bookingId, rate } = req.body;
  const ratedBooking = await bookingObject.rateBooking(bookingId, rate);
  assert(ratedBooking, ratedBooking, "Booking Rating failed", res);
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
    "Booking Link Attachment failed",
    res
  );
});

const acceptBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  const acceptedBooking = await bookingObject.acceptBooking(bookingId);
  assert(acceptedBooking, acceptedBooking, "Accepting booking has failed", res);
});

const completeBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  const completedBooking = await bookingObject.completeBooking(bookingId);
  assert(
    completedBooking,
    completedBooking,
    "Completing booking has failed",
    res
  );
});

const declineBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  const declinedBooking = await bookingObject.declineBooking(bookingId);
  assert(declinedBooking, declinedBooking, "Accepting booking has failed", res);
});

module.exports = {
  getBookings,
  addBooking,
  rateBooking,
  attachBookingMeetingLink,
  getUserBookings,
  acceptBooking,
  declineBooking,
  completeBooking,
};
