import { initMongoose } from "@/lib/initMongoose";
import { getAllCompanies } from "@/controlers/companyController";

export async function GET(req, res) {
  await initMongoose();
  return getAllCompanies(req, res);
}
