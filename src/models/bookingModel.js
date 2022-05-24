const mongoose = require("mongoose");
const { Schema } = mongoose;

// requester: { type: Schema.Types.ObjectId, ref: "User" },

const bookingSchema = mongoose.Schema(
  {
    requestStatus: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: false,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student id is needs to be included"],
    },
    serviceProvider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Service provider id is needs to be included"],
    },
    meeting_link: {
      type: String,
      required: false,
    },
  },

  { timestaps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
