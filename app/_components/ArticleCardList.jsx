import React from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../_lib/data-service";

async function ArticlesCardList({ searchParams }){
  const articles = await getArticles(searchParams);
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

export default ArticlesCardList;
