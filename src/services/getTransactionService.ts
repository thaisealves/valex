import * as paying from "../repositories/paymentRepository.js";
import * as recharging from "../repositories/rechargeRepository.js";
import { findCard } from "./findCard.js";
export async function gettingTransaction(cardId: number) {
  await findCard(cardId);
  const payment = await paying.findByCardId(cardId);
  const recharge = await recharging.findByCardId(cardId);
  let balance: number = 0;

  recharge.map((each) => (balance += each.amount));
  payment.map((each) => (balance += each.amount));

  return {
    balance,
    transactions: payment,
    recharges: recharge,
  };
}
