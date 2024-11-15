import Link from "next/link";
import { getArticle } from "../_lib/data-service";

async function Article({ id }) {
  const article = await getArticle(id);
  return (
    <div>
      <h3>
        <Link href={article.link}>{article.name}</Link>
      </h3>
    </div>
  );
}

export default Article;
