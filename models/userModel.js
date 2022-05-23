const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "User type was not specified"],
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    phone_number: {
      type: String,
    },
    location: {
      type: String,
    },
    faculty_name: {
      type: String,
    },
    birth_date: {
      type: Date,
    },
    specialKey: {
      type: String,
    },
    speciality: {
      type: String,
    },
    description: {
      type: String,
    },
    approval_status: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
