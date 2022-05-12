const mongoose = require("mongoose");
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //foriegn key for the other mode;
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "please add a text value"],
    },
  },

  { timestaps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
