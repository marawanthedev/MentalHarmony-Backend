const DailyPopUp = require("../models/dailyPopUpModel");

class DailyPopUpService {
  addArticleAttachment = async ({ article_feeling_relation, article_url }) => {
    const doesExist = await DailyPopUp.findOne({ article_feeling_relation });

    if (!doesExist) {
      const dailyPopUp = await DailyPopUp.create({
        article_url,
        article_feeling_relation,
      });
      return dailyPopUp;
    } else {
      const updatedDailyPopUp = await DailyPopUp.findOne({
        article_feeling_relation,
      }).updateOne({ article_url });
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
