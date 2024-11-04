import React from "react";
import ArticleCard from "./ArticleCard";

function articlesCards({ articles }){
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

export default articlesCards;
