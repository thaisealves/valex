import { Request, Response } from "express";
import { createRecharge } from "../services/createRechargeService.js";
export async function recharging(req: Request, res: Response) {
  const cardId = Number(req.params.cardId);
  const { amount } = req.body;
  await createRecharge(cardId, amount);
  res.sendStatus(200);
}
