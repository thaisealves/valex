import { Response, Request } from "express";
import {
  createPayment,
  createVirtualPayment,
} from "../services/paymentService.js";

export async function paying(req: Request, res: Response) {
  const { cardId, password, businessId, amount } = req.body;
  await createPayment(cardId, password, businessId, amount);
  res.sendStatus(200);
}

export async function virtualPaying(req: Request, res: Response) {
  const {
    cardNumber,
    cardholderName,
    expirationDate,
    securityCode,
    businessId,
    amount,
  } = req.body;
  
  await createVirtualPayment(
    cardNumber,
    cardholderName,
    expirationDate,
    securityCode,
    businessId,
    amount
  );
  res.sendStatus(200);
}
