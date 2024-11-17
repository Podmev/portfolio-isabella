import articleModel from "../_models/articleModel";
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from "./handlerFactory";

export const getAllArticles = getAll(articleModel);
export const getArticle = getOne(articleModel);
export const createArticle = createOne(articleModel);
export const deleteArticle = deleteOne(articleModel);
export const updateArticle = updateOne(articleModel);
