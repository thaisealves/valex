import { Request, Response, NextFunction } from "express";
import cardSchemas from "./schemas/cardSchemas.js";

export function apiKeyValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey: string = req.get("x-api-key");

  if (!apiKey) {
    throw { code: "Unauthorized", message: "API Key é necessária" };
  }
  res.locals.apiKey = apiKey;
  next();
}
