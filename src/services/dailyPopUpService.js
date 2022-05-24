const DailyPopUp = require("../models/dailyPopUpModel");

class DailyPopUpService {
  addArticleAttachment = async ({ article_feeling_relation, article_url }) => {
    const updatedDailyPopUp = await DailyPopUp.findOne({
      article_feeling_relation,
    }).updateOne({ article_url });

    if (!updatedDailyPopUp.matchedCount) {
      const dailyPopUp = await DailyPopUp.create({
        article_url,
        article_feeling_relation,
      });
      return dailyPopUp;
    } else {
      return updatedDailyPopUp;
    }
  };

  getArticles = async () => {
    const articles = await DailyPopUp.find();
    if (articles) {
      const reducedArticles = articles.map((article) => {
        return {
          article_url: article.article_url,
          article_feeling_relation: article.article_feeling_relation,
        };
      });
      return { reducedArticles };
    }
    return { message: "Failed to retrieve articles" };
  };
}

module.exports = DailyPopUpService;
