import { FC } from "react";
import { IArticle } from "../_types/Article";

export interface ArticleCardProps {
  article: IArticle;
}
const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <div>
      <h3>{article.name}</h3>
    </div>
  );
};

export default ArticleCard;
