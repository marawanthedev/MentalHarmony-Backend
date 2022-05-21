const express = require("express");
const router = express.Router();

const {
  addArticleAttachment,
  getArticles,
  addFeelingSubmission,
} = require("../controllers/dailyPopUpController");

// const { protect } = require("../middleware/authMiddleware");

router.post("/attachArticle", addArticleAttachment);
router.get("/articles", getArticles);
router.post("/feeling", addFeelingSubmission);

module.exports = router;
