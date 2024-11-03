import ArticleCard from "../../_components/ArticleCard";
import axiosWithUrl from "../../_lib/axiosWithUrl";
import { IArticle } from "../../_types/Article";

export default async function Page({params} : {params: {id: string}}){
    const id = params.id;
    const data = await axiosWithUrl.get(`/api/articles/${id}`)
    const article: IArticle = await data.data;
    return <div>
        <h1>Article page {id}</h1>
        <ArticleCard article={article}/>
    </div>

}