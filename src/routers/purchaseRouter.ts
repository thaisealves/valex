import { Router } from "express";
import purchaseSchema from "../middlewares/schemas/purchaseSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { recharging } from "../controllers/rechargeController.js";
const route = Router();

route.post(
  "/purchase",
  validateSchema(purchaseSchema)
);

export default route;
