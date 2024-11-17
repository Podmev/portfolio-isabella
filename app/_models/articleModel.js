import { model, Schema, models } from "mongoose";
import slugify from "slugify";

// TODO add fields:
// createdAt
// externalLink (true/false): false - for articles from this very site (blog)
// related articles (translated to different languages)  - maybe list of ids

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
    slug: String,
  },
  { timestamps: true }
);

articleSchema.index({ slug: 1 });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// adding language to article, because the same article can be translated to several languages
articleSchema.pre("save", function (next) {
  this.slug = slugify(`${this.englishName} ${this.language}`, {
    lower: true,
  }).replace(":", "");
  next();
});

const articleModel = models.Article || model("Article", articleSchema);

export default articleModel;
