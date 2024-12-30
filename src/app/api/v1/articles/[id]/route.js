import { initMongoose } from "@/lib/initMongoose";
import { getArticle } from "@/controlers/articleController";

export async function GET(req, props) {
  const params = await props.params;
  await initMongoose();
  return getArticle(req, params);
}
