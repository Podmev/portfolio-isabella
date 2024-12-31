import React from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "@/lib/data-service";

async function ArticlesCardList({ searchParams }) {
  const articles = await getArticles(searchParams);
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 
    xl:grid-cols-3 2xl:grid-cols-4 gap-8">
      {articles.map((a) => (
        <ArticleCard article={a} key={a.name} />
      ))}
    </div>
  );
}

export default ArticlesCardList;
