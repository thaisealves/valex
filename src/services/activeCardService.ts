import { CardUpdateData, update } from "../repositories/cardRepository.js";
import { findCard } from "../utils/findCard.js";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

function isActive(password: string | null) {
  if (password) {
    throw { code: "Conflict", message: "Cartão já ativado" };
  }
}

function validateSecurityCode(givenCode: string, originalCode: string) {
  const cryptr = new Cryptr(process.env.CRYPTR_PASS);
  const decryptedOriginalCode = cryptr.decrypt(originalCode);
  if (decryptedOriginalCode !== givenCode) {
    throw { code: "Unauthorized", message: "Código de Segurança Invalido" };
  }
}

function validatePassword(password: string) {
  if (password.length !== 4 || !Number(password)) {
    throw { code: "BodyInvalid", message: "Corpo inválido para senha" };
  }
  const passwordHash = bcrypt.hashSync(password, 10);

  return passwordHash;
}

export async function activeCard(
  id: number,
  password: string,
  securityCode: string
) {
  const card = await findCard(id);
  isActive(card.password);
  validateSecurityCode(securityCode, card.securityCode);
  const passwordHash = validatePassword(password);
  const cardData: CardUpdateData = {
    password: passwordHash,
  };
  await update(id, cardData);
}
