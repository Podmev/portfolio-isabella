import ArticleCards from "../../_components/ArticleCards";
import axiosWithUrl from "../../_lib/axiosWithUrl";
import { IArticle } from "../../_types/Article";

export default async function Page(){
    const data = await axiosWithUrl.get("/api/articles")
    const articles: IArticle[] = await data.data;
    console.log(articles);
    return <div>
        <h1>Articles page</h1>
        <ArticleCards articles={articles}/>
    </div>

}