import React from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "@/lib/data-service";

async function ArticlesCardList({ searchParams }) {
  const articles = await getArticles(searchParams);
  return (
    <div className="grid grid-cols-2 gap-8">
      {articles.map((a) => (
        <ArticleCard article={a} key={a.name} />
      ))}
    </div>
  );
}

export default ArticlesCardList;
