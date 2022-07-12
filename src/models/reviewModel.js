const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    rate: {
        type: Number,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Revuew", reviewSchema);