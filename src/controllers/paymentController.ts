import { Response, Request } from "express";
import { createPayment } from "../services/paymentService.js";

export async function paying(req: Request, res: Response) {
  const { cardId, password, businessId, amount } = req.body;
  await createPayment(cardId, password, businessId, amount);
  res.sendStatus(200);
}
