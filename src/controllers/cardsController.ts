import { Request, Response } from "express";
import { createCard } from "../services/createCardService.js";
import { activeCard } from "../services/activeCardService.js";
export async function creatingCard(req: Request, res: Response) {
  const { cardType, employeeId } = req.body;
  const { apiKey } = res.locals;
  const securityCode = await createCard(cardType, employeeId, apiKey);
  return res.status(201).send(securityCode);
}

export async function activatingCard(req: Request, res: Response) {
  const cardId = Number(req.params.cardId);
  const { password, securityCode } = req.body;
  await activeCard(cardId, password, securityCode);
  res.sendStatus(200);
}
