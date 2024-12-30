import ArticleCardList from "@/components/ArticleCardList";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  return (
    <div className="">
      <h1>Articles page</h1>
      <ArticleCardList searchParams={searchParams} />
    </div>
  );
}
