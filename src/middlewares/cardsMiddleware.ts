import { Request, Response, NextFunction } from "express";
import joi from "joi";

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

export function bodyValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = bodySchema.validate(req.body);
  if (error) {
    console.log(error)
    throw { code: "BodyInvalid", message: "Corpo inválido" };
  }
  next();
}

const bodySchema = joi.object({
  cardType: joi
    .string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
  employeeId: joi.number().required(),
});
