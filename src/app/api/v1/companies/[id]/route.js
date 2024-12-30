import { initMongoose } from "@/lib/initMongoose";
import { getCompany } from "@/controlers/companyController";

export async function GET(req, props) {
  const params = await props.params;
  await initMongoose();
  return getCompany(req, params);
}
