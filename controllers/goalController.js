const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

//@desc getGoals
//@route get/api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

//@desc set Goals
//@route post/api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
  console.log(req.body);

  if (!req.body.text) {
    res.status(400);
    // better error handling for debugging
    throw new Error("please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

//@desc updateGoals
//@route put/api/goals
//@access Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("goal not found ");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    req.body,
    //create it if doesnt exist
    { new: true }
  );
  res.status(200).json(updatedGoal);
});

//@desc deleteGoals
//@route delete/api/goals:id
//@access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }
  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedGoal);
});

module.exports = {
  getGoals,
  setGoal,
  updateGoals,
  deleteGoals,
};
