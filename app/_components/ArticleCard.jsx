import Link from "next/link";

async function ArticleCard({ article}) {
  return (
    <div>
      <h3>
        <Link
          href={`/articles/${article._id}`}
        >
          {article.name}
        </Link>
      </h3>
    </div>
  );
}

export default ArticleCard;
