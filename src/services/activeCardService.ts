import {
  CardUpdateData,
  findById,
  update,
} from "../repositories/cardRepository.js";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
export async function findCard(id: number) {
  const card = await findById(id);
  if (!card) {
    throw { code: "NotFound", message: "Funcionário não encontrado" };
  }
  if (isExpired(card.expirationDate)) {
    throw { code: "Conflict", message: "Cartão expirado" };
  }
  if (card.password) {
    throw { code: "Conflict", message: "Cartão já ativado" };
  }
  return card;
}

function isExpired(expirationDate: string) {
  const [month, year] = expirationDate.split("/");
  const expiration = dayjs()
    .month(Number(month) - 1)
    .year(Number(year) + 2000);

  return !dayjs().isBefore(expiration, "month");
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
  validateSecurityCode(securityCode, card.securityCode);
  const passwordHash = validatePassword(password);
  const cardData: CardUpdateData = {
    password: passwordHash,
  };
  await update(id, cardData);
}
