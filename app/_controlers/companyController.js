import companyModel from "../_models/companyModel";
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from "./handlerFactory";

export const getAllCompanies = getAll(companyModel);
export const getCompany = getOne(companyModel);
export const createCompany = createOne(companyModel);
export const deleteCompany = deleteOne(companyModel);
export const updateCompany = updateOne(companyModel);
