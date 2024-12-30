import Article from "@/app/_components/Article";

export default async function Page(props) {
    const params = await props.params;
    const id = params.id;
    return <div>
        <h1>Article page {id}</h1>
        <Article id={id}/>
    </div>
}