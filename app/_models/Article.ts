import { model, Schema, models } from "mongoose";

const articleSchema = new Schema(
  {
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

const Article =  models.Article || model("Article", articleSchema);

export default Article;
