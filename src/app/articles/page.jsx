import ArticleCardList from "@/components/ArticleCardList";

// export const revalidate = 3600;
export const revalidate = 0;

export const metadata = {
  title: "Articles",
};

export default async function Page(props) {
  const searchParams = await props.searchParams;
  return (
    <div className="">
      <h1>Articles page</h1>
      <ArticleCardList searchParams={searchParams} />
    </div>
  );
}
