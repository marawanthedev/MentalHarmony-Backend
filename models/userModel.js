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
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    faculty_name: {
      type: String,
      required: false,
    },
    birth_date: {
      type: Date,
      required: false,
    },
    specialKey: {
      type: String,
      required: false,
    },
    speciality: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
