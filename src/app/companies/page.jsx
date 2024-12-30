import CompanyCardList from "@/components/CompanyCardList";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  return (
    <div>
      <h1>Companies page</h1>
      <CompanyCardList searchParams={searchParams} />
    </div>
  );
}
