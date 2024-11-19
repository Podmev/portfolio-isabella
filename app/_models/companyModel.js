import { model, Schema, models } from "mongoose";
import slugify from "slugify";

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
    logo: { type: String, required: true },
    logoSquare: { type: String, required: true },
    profiles: [
      {
        lang: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    about: { type: String, required: true },
    workingSince: { type: Date, required: true },
    workingTill: { type: Date, required: false },
    positions: [{ type: String, required: true }],
    tags: [{ type: String, required: true }],
    slug: String,
  },
  { timestamps: true }
);

companySchema.index({ slug: 1 });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
companySchema.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

const companyModel = models.Company || model("Company", companySchema);

export default companyModel;
