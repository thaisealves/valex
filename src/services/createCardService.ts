import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";
import {
  findByTypeAndEmployeeId,
  insert,
} from "../repositories/cardRepository.js";
import { TransactionTypes } from "../repositories/cardRepository.js";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

async function getApiKey(apiKey: string) {
  const company = await findByApiKey(apiKey);
  if (!company) {
    throw { code: "NotFound", message: "Empresa não encontrada" };
  }
}

async function getEmployee(id: number) {
  const employee = await findById(id);

  if (!employee) {
    throw { code: "NotFound", message: "Funcionário não encontrado" };
  }

  return employee;
}

async function ownCardType(type: TransactionTypes, employeeId: number) {
  const card = await findByTypeAndEmployeeId(type, employeeId);
  if (card) {
    throw {
      code: "Conflict",
      message: "Tipo de cartão já existente ao funcionário",
    };
  }
}

function createCardNumber(): string {
  const cardNumber: string = faker.finance.creditCardNumber();
  return cardNumber;
}

function createCardholderName(employee: { fullName: string }): string {
  const nameArray: string[] = employee.fullName.split(" ");
  let cardholderName = nameArray[0];

  for (let i = 1; i < nameArray.length - 1; i++) {
    if (nameArray[i].length > 3) {
      cardholderName += ` ${nameArray[i][0]}`;
    }
  }
  cardholderName += ` ${nameArray[nameArray.length - 1]}`;

  cardholderName = cardholderName.toUpperCase();

  return cardholderName;
}

function createExpirationDate() {
  const expirationDate = dayjs().add(5, "year");

  return expirationDate.format("MM/YY");
}

function createSecurityCode() {
  const cryptr = new Cryptr(process.env.CRYPTR_PASS);

  const encryptedSecurityCode = cryptr.encrypt(faker.finance.creditCardCVV());
  return encryptedSecurityCode;
}

export async function createCard(
  cardType: TransactionTypes,
  employeeId: number,
  apiKey: string
) {
  await getApiKey(apiKey);
  const employee = await getEmployee(employeeId);
  await ownCardType(cardType, employeeId);

  const newCard = {
    employeeId,
    number: createCardNumber(),
    cardholderName: createCardholderName(employee),
    securityCode: createSecurityCode(),
    expirationDate: createExpirationDate(),
    isVirtual: false,
    isBlocked: false,
    type: cardType,
  };
  // await insert(newCard);
}
