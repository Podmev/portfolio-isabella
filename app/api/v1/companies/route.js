import { initMongoose } from "../../../_lib/initMongoose";
import { getAllCompanies } from "../../../_controlers/companyController";

export async function GET(req, res) {
  await initMongoose();
  return getAllCompanies(req, res);
}
