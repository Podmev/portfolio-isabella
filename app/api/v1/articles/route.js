import { initMongoose } from "../../../_lib/initMongoose";
import { getAllArticles } from "../../../_controlers/articleController";

export async function GET(req, res) {
  await initMongoose();
  return getAllArticles(req, res);
}
