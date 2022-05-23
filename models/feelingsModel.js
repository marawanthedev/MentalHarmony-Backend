const mongoose = require("mongoose");

const feelingSchema = mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Feeling", feelingSchema);
