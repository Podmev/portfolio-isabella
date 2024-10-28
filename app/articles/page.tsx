import axiosWithUrl from "../_lib/axiosWithUrl";

export default async function Page(){
    const data = await axiosWithUrl.get("/api/articles")
    const articles = await data.data;
    console.log(articles);
    return <h1>Articles page</h1>

}