import { findCard } from "./findCard.js";
import { update, CardUpdateData } from "../repositories/cardRepository.js";
import { validatePassword } from "./validatePassword.js";
import { isActive } from "./isCardActive.js";
function isBlocked(blocked: boolean) {
  if (blocked) {
    //if the card is blocked, this will unblock it, same logic for the else part
    return false;
  } else {
    return true;
  }
}

export async function blockCard(id: number, password: string) {
  const card = await findCard(id); //seeing if existes and the expiration
  const blocking: boolean = isBlocked(card.isBlocked);
  isActive(card.password);
  validatePassword(password, card.password);
  const cardData: CardUpdateData = {
    isBlocked: blocking,
  };
  await update(id, cardData);
}
