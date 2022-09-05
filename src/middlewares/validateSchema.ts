import { Request, Response, NextFunction } from "express";
export const validateSchema = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      throw {
        code: "BodyInvalid",
        message: `Corpo inválido: ${error.details[0].message}`,
      };
    }
    next();
  };
};
