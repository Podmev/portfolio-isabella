import companyModel from "@/models/companyModel";
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from "./handlerFactory";

export const getAllCompanies = getAll(companyModel, "companies");
export const getCompany = getOne(companyModel);
export const createCompany = createOne(companyModel);
export const deleteCompany = deleteOne(companyModel);
export const updateCompany = updateOne(companyModel);
