import ArticleCard from "../../_components/ArticleCard";
import axiosWithUrl from "../../_lib/axiosWithUrl";

export default async function Page({params}){
    const id = params.id;
    const data = await axiosWithUrl.get(`/api/articles/${id}`)
    const article = await data.data;
    return <div>
        <h1>Article page {id}</h1>
        <ArticleCard article={article}/>
    </div>

}