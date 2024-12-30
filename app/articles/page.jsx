import ArticleCardList from "../_components/ArticleCardList";

export default async function Page({ searchParams }){
    return <div className="bg-primary-500 text-red-500">
        <h1>Articles page</h1>
        <ArticleCardList searchParams={searchParams}/>
    </div>

}