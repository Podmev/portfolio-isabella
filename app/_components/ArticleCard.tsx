import { FC } from "react";
import { IArticleDocument } from "../_types/Article";
import Link from "next/link";

export interface ArticleCardProps {
  article: IArticleDocument;
}
const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <div>
      <h3>
        <Link href={`/articles/${article._id}`}>{article.name}</Link>
      </h3>
    </div>
  );
};

export default ArticleCard;
