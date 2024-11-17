import ArticleCardList from "../_components/ArticleCardList";

export default async function Page({ searchParams }){
    return <div>
        <h1>Articles page</h1>
        <ArticleCardList searchParams={searchParams}/>
    </div>

}