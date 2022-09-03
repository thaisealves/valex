import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";
import { findByTypeAndEmployeeId } from "../repositories/cardRepository.js";
import { TransactionTypes } from "../repositories/cardRepository.js";
export async function getApiKey(apiKey: string) {
  const company = await findByApiKey(apiKey);

  if (!company) {
    throw { code: "NotFound", message: "Empresa não encontrada" };
  }
}

export async function getEmployee(id: number) {
  const employee = await findById(id);

  if (!employee) {
    throw { code: "NotFound", message: "Funcionário não encontrado" };
  }
}

export async function seeExistingCardByEmployee(
  type: TransactionTypes,
  employeeId: number
) {
  const card = await findByTypeAndEmployeeId(type, employeeId);
  if (card) {
    throw {
      code: "Conflict",
      message: "Tipo de cartão já existente ao funcionário",
    };
  }
}
