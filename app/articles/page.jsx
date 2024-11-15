import ArticleCardList from "../_components/ArticleCardList";
import axiosWithUrl from "../_lib/axiosWithUrl";

export default async function Page({ searchParams }){
    // const data = await axiosWithUrl.get("/api/articles")
    // const articles = await data.data;
    return <div>
        <h1>Articles page</h1>
        <ArticleCardList searchParams={searchParams}/>
    </div>

}