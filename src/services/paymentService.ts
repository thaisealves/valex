import { findCard } from "./findCard.js";
import { isActive } from "./isCardActive.js";
import { validatePassword } from "./validatePassword.js";
import { TransactionTypes } from "../repositories/cardRepository";
import { findBusiness } from "./findBusiness.js";
import { gettingTransaction } from "./getTransactionService.js";
import { insert } from "../repositories/paymentRepository.js";
import { findByCardDetails } from "../repositories/cardRepository.js";
import dayjs from "dayjs";
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

export async function createVirtualPayment(
  cardNumber: string,
  cardholderName: string,
  expirationDate: string,
  securityCode: string,
  businessId: number,
  amount: number
) {
  const card = await findByCardDetails(
    cardNumber,
    cardholderName,
    expirationDate
  );

  if (!card) {
    throw { code: "NotFound", message: "Cartão não encontrado" };
  }
  if (card.isBlocked) {
    throw { code: "Conflict", message: "Cartão bloqueado" };
  }
  if (isExpired(card.expirationDate)) {
    throw { code: "Conflict", message: "Cartão expirado" };
  }
  await businessValidation(businessId, card.type);
}

async function allValidations(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  const card = await findCard(cardId);
  const transaction = await gettingTransaction(cardId);
  await businessValidation(businessId, card.type);
  isBlocked(card.isBlocked);
  isActive(card.password);
  validatePassword(password, card.password);
  validTransaction(amount, transaction.balance);
}

async function businessValidation(
  businessId: number,
  cardType: TransactionTypes
) {
  const business = await findBusiness(businessId);
  validType(cardType, business.type);
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

function isExpired(expirationDate: string) {
  const [month, year] = expirationDate.split("/");
  const expiration = dayjs()
    .month(Number(month) - 1)
    .year(Number(year) + 2000);

  return !dayjs().isBefore(expiration, "month");
}
