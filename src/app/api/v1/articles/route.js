import { initMongoose } from "@/lib/initMongoose";
import { getAllArticles } from "@/controlers/articleController";

export async function GET(req) {
  await initMongoose();
  return getAllArticles(req);
}
