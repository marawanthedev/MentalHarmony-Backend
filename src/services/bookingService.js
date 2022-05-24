const Booking = require("../models/bookingModel");

class BookingService {
  getBookings = async () => {
    const bookings = await Booking.find()
      .populate("student", { name: 1, faculty_name: 1 })
      .populate("serviceProvider", { name: 1, phone_number: 1 });
    return bookings;
  };
  addBooking = async (student, serviceProvider) => {
    const booking = await Booking.create({
      student,
      serviceProvider,
      requestStatus: "pending",
    });
    return booking;
  };
  reviewBooking = async (bookingId, rate) => {
    const reviewedBooking = await Booking.findByIdAndUpdate(bookingId, {
      rate,
    });
    return reviewedBooking;
  };
  attachBookingMeetingLink = async (bookingId, meeting_link) => {
    const bookingWithAttachedLink = await Booking.findByIdAndUpdate(bookingId, {
      meeting_link,
    });
    return bookingWithAttachedLink;
  };
}

module.exports = BookingService;
