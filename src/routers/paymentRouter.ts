import { Router } from "express";
import schemas from "../middlewares/schemas/paymentSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { paying } from "../controllers/paymentController.js";
const route = Router();

route.post("/payment", validateSchema(schemas.paymentSchema), paying);
route.post("/payment/virtual", validateSchema(schemas.virtualPaymentSchema));
export default route;
