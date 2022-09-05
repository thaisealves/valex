import { Router } from "express";
import { apiKeyValidation } from "../middlewares/apiKeyValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  creatingCard,
  activatingCard,
  blockingCard
} from "../controllers/cardsController.js";
import cardSchemas from "../middlewares/schemas/cardSchemas.js";
const route = Router();

route.post(
  "/card/create",
  apiKeyValidation,
  validateSchema(cardSchemas.createSchema),
  creatingCard
);

route.put(
  "/card/activate/:cardId",
  validateSchema(cardSchemas.activeSchema),
  activatingCard
);
route.put(
  "/card/block/:cardId",
  validateSchema(cardSchemas.blockSchema),
  blockingCard
);

export default route;
