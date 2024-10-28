import { model, models, Schema } from "mongoose";

const ArticleSchema = new Schema(
  {
    name: String,
    englishName: String,
    link: String,
    date: String,
    company: String,
    type: String,
    originLang: String,
    language: String,
    tags: String, //TODO change to array
    summary: String,
  }
);

const Article = models?.Article || model("Article", ArticleSchema);

export default Article;
