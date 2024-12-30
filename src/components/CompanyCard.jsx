import Link from "next/link";

async function CompanyCard({ company }) {
  return (
    <div>
      <h3>
        <Link href={`/companies/${company.slug}`}>{company.name}</Link>
      </h3>
    </div>
  );
}

export default CompanyCard;
