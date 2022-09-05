import { findCard } from "./findCard.js";
import { isActive } from "./isCardActive.js";
import { insert } from "../repositories/rechargeRepository.js";
export async function createRecharge(cardId: number, amount: number) {
  const card = await findCard(cardId); // see if it existes and if it is expired
  isActive(card.password);
  const rechargeData = {
    cardId,
    amount,
  };
  await insert(rechargeData);
}
