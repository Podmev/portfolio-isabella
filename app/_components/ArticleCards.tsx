import React, { FC } from "react";
import { IArticleDocument } from "../_types/Article";
import ArticleCard from "./ArticleCard";

export interface ArticleCardsProps {
  articles: IArticleDocument[];
}

const ArticleCards: FC<ArticleCardsProps> = ({ articles }) => {
  return (
    <div>
      <ul>
        {articles.map((a) => (
          <li key={a.name}>{<ArticleCard article={a} />}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleCards;
