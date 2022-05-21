const mongoose = require("mongoose");

const dailyPopUpSchema = mongoose.Schema(
  {
    article_url: {
      type: String,
      required: false,
    },
    article_feeling_relation: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DailyPopup", dailyPopUpSchema);
