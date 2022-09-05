import { Request, Response } from "express";
import { createCard } from "../services/createCardService.js";
export async function creatingCard(req: Request, res: Response) {
  const { cardType, employeeId } = req.body;
  const { apiKey } = res.locals;
  await createCard(cardType, employeeId, apiKey);
  return res.status(201).send("Cartão criado");
}


