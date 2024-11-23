import React from "react";
import CompanyCard from "./CompanyCard";
import { getCompanies } from "@/app/_lib/data-service";

async function CompaniesCardList({ searchParams }){
  const companies = await getCompanies(searchParams);
  return (
    <div>
      <ul>
        {companies.map((c) => (
          <li key={c.name}>{<CompanyCard company={c} />}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompaniesCardList;
