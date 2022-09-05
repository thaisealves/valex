import { findById } from "../repositories/businessRepository.js";

export async function findBusiness(businessId: number) {
  const business = await findById(businessId);

  if (!business) {
    throw { code: "NotFound", message: "Empresa não cadastrada" };
  }
  return business;
}
