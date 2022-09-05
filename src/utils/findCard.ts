import { findById } from "../repositories/cardRepository.js";
import dayjs from "dayjs";
export async function findCard(id: number) {
  const card = await findById(id);
  if (!card) {
    throw { code: "NotFound", message: "Cartão não encontrado" };
  }
  if (isExpired(card.expirationDate)) {
    throw { code: "Conflict", message: "Cartão expirado" };
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
