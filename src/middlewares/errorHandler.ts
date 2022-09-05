import { Request, Response, NextFunction } from "express";
export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.code === "NotFound") {
    return res.status(404).send(error.message);
  }
  if (error.code === "Unauthorized") {
    return res.status(401).send(error.message);
  }
  if (error.code === "BodyInvalid") {
    return res.status(422).send(error.message);
  }
  if (error.code === "Conflict") {
    return res.status(409).send(error.message);
  }
  
  res.sendStatus(500);
}
