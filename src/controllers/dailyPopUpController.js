const asyncHandler = require("express-async-handler");
const DailyPopUp = require("../models/dailyPopUpModel");
const assert = require("../helpers/assertion");
//@desc add article attachment
//@route post/api/users
//@access Public

const addArticleAttachment = asyncHandler(async (req, res) => {
  const { article_url, article_feeling_relation } = req.body;

  const dailyPopUpExists = await DailyPopUp.findOne({
    article_feeling_relation,
  });

  if (!dailyPopUpExists) {
    const dailyPopUp = await DailyPopUp.create({
      article_url,
      article_feeling_relation,
    });
    assert(dailyPopUp, dailyPopUp, "Article attachment has not succeeded", res);
  } else {
    const dailyPopUp = await DailyPopUp.findOneAndUpdate(
      article_feeling_relation,
      { article_url }
    );

    assert(
      dailyPopUp,
      { article_url, article_feeling_relation },
      "Article attachment has not succeeded",
      res
    );
  }
});

const getArticles = asyncHandler(async (req, res) => {
  const articles = await DailyPopUp.find();
  const reducedArticles = articles.map((article) => {
    return {
      article_url: article.article_url,
      article_feeling_relation: article.article_feeling_relation,
    };
  });
  assert(
    articles,
    reducedArticles,
    "Articles retrieval has not succeeded",
    res
  );
});

module.exports = { addArticleAttachment, getArticles };
