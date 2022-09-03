import { Request, Response } from "express";
import * as createCardService from "../services/createCardService.js";

export async function creatingCard(req: Request, res: Response) {
  const apiKey: string = req.get("x-api-key");
  const { type, employeeId } = req.body;

  await createCardService.getApiKey(apiKey);
  await createCardService.getEmployee(employeeId);
  await createCardService.seeExistingCardByEmployee(type, employeeId);
}

//bodySchema: employeeId, type,