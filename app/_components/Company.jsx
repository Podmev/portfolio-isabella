import Link from "next/link";
import { getCompany } from "../_lib/data-service";

async function Company({ id }) {
  const company = await getCompany(id);
  return (
    <div>
      <h3>
        <Link href={company.link}>{company.name}</Link>
      </h3>
    </div>
  );
}

export default Company;
