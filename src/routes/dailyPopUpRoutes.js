const express = require("express");
const router = express.Router();

const {
  addArticleAttachment,
  getArticles,
} = require("../controllers/dailyPopUpController");

// const { protect } = require("../middleware/authMiddleware");

router.post("/attachArticle", addArticleAttachment);
router.get("/articles", getArticles);

module.exports = router;
