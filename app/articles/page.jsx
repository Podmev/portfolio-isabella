import ArticleCards from "../_components/ArticleCards";
import axiosWithUrl from "../_lib/axiosWithUrl";

export default async function Page(){
    const data = await axiosWithUrl.get("/api/articles")
    const articles = await data.data;
    return <div>
        <h1>Articles page</h1>
        <ArticleCards articles={articles}/>
    </div>

}