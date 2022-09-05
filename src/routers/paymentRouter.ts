import { Router } from "express";
import paymentSchema from "../middlewares/schemas/paymentSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { paying } from "../controllers/paymentController.js";
const route = Router();

route.post("/payment", validateSchema(paymentSchema), paying);

export default route;
