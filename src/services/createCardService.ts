import { findByApiKey } from "../repositories/companyRepository.js";

export async function getApiKey(apiKey: string) {
  const company = await findByApiKey(apiKey);

  if (!company) {
    throw { code: "NotFounf", message: "Empresa não encontrada" };
  }
}
