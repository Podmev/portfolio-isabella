import Link from "next/link";

async function ArticleCard({ article }) {
  return (
    <div>
      <h3>
        <Link href={`/articles/${article.slug}`}>{article.name}</Link>
      </h3>
    </div>
  );
}

export default ArticleCard;
