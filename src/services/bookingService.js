const Booking = require("../models/bookingModel");

class BookingService {
  getBookings = async () => {
    const bookings = await Booking.find()
      .populate("student", { name: 1, faculty_name: 1,phone_number: 1 })
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

  rateBooking = async (bookingId, rate) => {
    const ratedBooking = await Booking.findByIdAndUpdate(bookingId, {
      rate,
    });
    return ratedBooking;
  };
  attachBookingMeetingLink = async (bookingId, meeting_link) => {
    const bookingWithAttachedLink = await Booking.findByIdAndUpdate(bookingId, {
      meeting_link,
    });
    return bookingWithAttachedLink;
  };

  acceptBooking = async (bookingId) => {
    const acceptedBooking = await Booking.findByIdAndUpdate(bookingId, {
      requestStatus: "accepted",
    });
    return acceptedBooking;
  };
  completeBooking = async (bookingId) => {
    const completedBooking = await Booking.findByIdAndUpdate(bookingId, {
      requestStatus: "completed",
    });
    return completedBooking;
  };
  declineBooking = async (bookingId) => {
    const acceptBooking = await Booking.findByIdAndUpdate(bookingId, {
      requestStatus: "declined",
    });
    return acceptBooking;
  };
  removeBookings=async(userId)=>{
    const deleteBooking=await Booking.deleteMany({serviceProvider:userId})
    return deleteBooking
  }
}

module.exports = BookingService;
