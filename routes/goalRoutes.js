const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

router.route("/").get(getGoals).post(setGoal);
router.route("/:id").put(updateGoals).delete(deleteGoals);

// router.get("/", getGoals);
// router.post("/", setGoals);
// router.put("/:id", updateGoals);
// router.delete("/:id", deleteGoals);

module.exports = router;
