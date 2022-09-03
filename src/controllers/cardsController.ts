import { Request, Response } from "express";
import * as createCard from "../services/createCardService.js";

export async function getCompany(req: Request, res: Response) {
  const apiKey: string = req.get("x-api-key");
  await createCard.getApiKey(apiKey);
}
