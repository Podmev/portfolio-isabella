import Article from "../_models/Article";
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from "./handlerFactory";

export const getAllArticles = getAll(Article);
export const getArticle = getOne(Article);
export const createArticle = createOne(Article);
export const deleteArticle = deleteOne(Article);
export const updateArticle = updateOne(Article);
