import CompanyCardList from "../_components/CompanyCardList";

export default async function Page({ searchParams }){
    return <div>
        <h1>Companies page</h1>
        <CompanyCardList searchParams={searchParams}/>
    </div>

}