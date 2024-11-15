import Article from "@/app/_components/Article";
import axiosWithUrl from "../../_lib/axiosWithUrl";

export default async function Page({params}){
    const id = params.id;
    return <div>
        <h1>Article page {id}</h1>
        <Article id={id}/>
    </div>

}