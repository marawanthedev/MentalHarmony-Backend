const asyncHandler = require("express-async-handler");
const assert = require("../helpers/assertion");
const DailyPopUpService = require("../services/dailyPopUpService");
const dailyPopUpObject = new DailyPopUpService();

//@desc add article attachment
//@route post/api/users
//@access Public

const addArticleAttachment = asyncHandler(async (req, res) => {
  const { article_url, article_feeling_relation } = req.body;
  const user = req.user;

  if (user.type === "admin") {
    const dailyPopUp = await dailyPopUpObject.addArticleAttachment({
      article_feeling_relation,
      article_url,
    });
    assert(
      dailyPopUp,
      { article_url, article_feeling_relation },
      "Article attachment has not succeeded",
      res
    );
  }
});

const getArticles = asyncHandler(async (req, res) => {
  const { reducedArticles, message } = await dailyPopUpObject.getArticles();
  assert(reducedArticles, reducedArticles, message, res);
});

module.exports = { addArticleAttachment, getArticles };
