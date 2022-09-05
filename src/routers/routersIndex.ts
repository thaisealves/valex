import { Router } from "express";
import cardRouter from "./cardRouter.js";
import rechargeRouter from "./rechargeRouter.js";
import paymentRouter from "./paymentRouter.js";
const route = Router();

route.use(cardRouter);
route.use(rechargeRouter);
route.use(paymentRouter);

export default route;
