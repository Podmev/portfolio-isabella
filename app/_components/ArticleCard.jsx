import Link from "next/link";

function articleCard({ article }) {
  return (
    <div>
      <h3>
        <Link href={`/articles/${article._id}`}>{article.name}</Link>
      </h3>
    </div>
  );
};

export default articleCard;
