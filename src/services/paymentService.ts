import { findCard } from "./findCard.js";
import { isActive } from "./isCardActive.js";
import { validatePassword } from "./validatePassword.js";
import { TransactionTypes } from "../repositories/cardRepository";
import { findBusiness } from "./findBusiness.js";
import { gettingTransaction } from "./getTransactionService.js";
import { insert } from "../repositories/paymentRepository.js";
export async function createPayment(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  await allValidations(cardId, password, businessId, amount);
  const paymentData = {
    cardId,
    businessId,
    amount,
  };
  await insert(paymentData);
}

async function allValidations(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  const card = await findCard(cardId);
  const business = await findBusiness(businessId);
  const transaction = await gettingTransaction(cardId);
  isBlocked(card.isBlocked);
  isActive(card.password);
  validatePassword(password, card.password);
  validType(card.type, business.type);
  validTransaction(amount, transaction.balance);
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

function validTransaction(amount: number, balance: number) {
  console.log(amount, balance);
  if (amount > balance) {
    throw { code: "Unauthorized", message: "Saldo insuficiente" };
  }
}
