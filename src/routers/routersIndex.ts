import { Router } from "express";
import cardRouter from "./cardRouter.js";
import rechargeRouter from "./rechargeRouter.js";
const route = Router();

route.use(cardRouter);
route.use(rechargeRouter);

export default route;
