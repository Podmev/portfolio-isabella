import { initMongoose } from "../../../../_lib/initMongoose";
import { getCompany } from "../../../../_controlers/companyController";

export async function GET(req, { params }) {
  await initMongoose();
  return getCompany(req, params);
}
