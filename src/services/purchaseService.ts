import { findCard } from "./findCard.js";
import { isActive } from "./isCardActive.js";
import { validatePassword } from "./validatePassword.js";
import { TransactionTypes } from "../repositories/cardRepository";
import { findBusiness } from "./findBusiness.js";

export async function createPurchase(
  cardId: number,
  password: string,
  businessId: number
) {
  const card = await findCard(cardId);
  const business = await findBusiness(businessId);
  isBlocked(card.isBlocked);
  isActive(card.password);
  validatePassword(password, card.password);
  validType(card.type, business.type);
}

function isBlocked(blocked: boolean) {
  if (blocked) {
    throw { code: "Conflict", message: "Cartão bloqueado" };
  }
}

function validType(cardType: TransactionTypes, businessType: TransactionTypes) {
  if (cardType !== businessType) {
    throw {
      code: "Unauthorized",
      message: "Tipo de estabelecimento incompatível com cartão utilizado",
    };
  }
}
