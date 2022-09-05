import { Router } from "express";
import {
  apiKeyValidation,
  bodyValidation,
} from "../middlewares/cardsMiddleware.js";
import { creatingCard } from "../controllers/cardsController.js";
const route = Router();

route.post("/card", apiKeyValidation, bodyValidation, creatingCard);

export default route;
