import { initMongoose } from "../../../../_lib/initMongoose";
import { getArticle } from "../../../../_controlers/articleController";

export async function GET(req, { params }) {
  await initMongoose();
  return getArticle(req, params);
}
