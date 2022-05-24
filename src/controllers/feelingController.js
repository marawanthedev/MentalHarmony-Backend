const asyncHandler = require("express-async-handler");
const Feeling = require("../models/feelingsModel");
const assert = require("../helpers/assertion");

//@desc add feeling submission
//@route post/feeling
//@access Public

const addFeelingSubmission = asyncHandler(async (req, res) => {
  const { feeling } = req.body;

  const feelingSubmission = await Feeling.create({
    value: feeling,
  });
  assert(
    feelingSubmission,
    feelingSubmission,
    "Feeling submission has not succeeded",
    res
  );
});

const getFeelings = asyncHandler(async (req, res) => {
  const feelings = await Feeling.find();
  assert(feelings, feelings, "No stored feelings were found", res);
});

module.exports = { addFeelingSubmission, getFeelings };

