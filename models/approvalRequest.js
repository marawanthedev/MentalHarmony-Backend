const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = mongoose.Schema(
  {
    requester: { type: Schema.Types.ObjectId, ref: "User" },
    isApproved: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema);
