import { Router } from "express";
import rechargeSchema from "../middlewares/schemas/rechargeSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { apiKeyValidation } from "../middlewares/apiKeyValidation.js";
import { recharging } from "../controllers/rechargeController.js";
const route = Router();

route.post(
  "/recharge/:cardId",
  apiKeyValidation,
  validateSchema(rechargeSchema),
  recharging
);

export default route;
