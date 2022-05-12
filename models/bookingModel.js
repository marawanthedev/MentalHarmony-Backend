const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    requestStatus: {
      type: String,
      require: true,
    },
    review: {
      type: String,
      require: true,
    },
    student_id: {
      type: String,
      require: [true, "Student id is needs to be included"],
    },
    serviceProvider: {
      type: String,
      require: [true, "Service provider id is needs to be included"],
    },
    meeting_link: {
      type: String,
      require: false,
    },
    date: {
      type: String,
      require: false,
    },
    time: {
      type: String,
      require: false,
    },
  },

  { timestaps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
