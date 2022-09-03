import { Request, Response, NextFunction } from "express";
import joi from "joi";

export function apiKeyValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    throw { code: "Unauthorized", message: "API Key é necessária" };
  }
  next();
}

export function typeValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = typeSchema.validate(req.body.type);
  if (error) {
    throw { code: "BodyInvalid", message: "Corpo inválido" };
  }
  next();
}

const typeSchema = joi.object({
  type: joi
    .string()
    .required()
    .valid("groceries", "restaurant", "transport", "education", "health"),
});
