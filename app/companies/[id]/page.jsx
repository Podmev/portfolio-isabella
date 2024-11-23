import Company from "@/app/_components/Company";

export default async function Page({params}){
    const id = params.id;
    return <div>
        <h1>Company page {id}</h1>
        <Company id={id}/>
    </div>

}