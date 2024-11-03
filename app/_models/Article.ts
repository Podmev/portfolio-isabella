import { model, Schema, models } from "mongoose";
import {IArticle, IArticleDocument, IArticleModel} from "../_types/Article";

const ArticleSchema: Schema<IArticleDocument> = new Schema(
  {
    _id: {type: String, required: true},
    name: { type: String, required: true },
    englishName: { type: String, required: true },
    link: { type: String, required: true },
    date: { type: Date, required: true },
    company: { type: String, required: true },
    type: { type: String, required: true },
    originLang: { type: String, required: true },
    language: { type: String, required: true },
    tags: [{ type: String, required: true }],
    summary: { type: String, required: true },
  },
  { timestamps: true }
);

ArticleSchema.statics.buildArticle = (args: IArticle) => {
  return new Article(args)
}

const Article =  models.Article || model<IArticleDocument, IArticleModel>("Article", ArticleSchema);

export default Article;
