import { Router } from "express";
import cardRouter from "./cardRouter.js";
const route = Router();

route.use(cardRouter)

export default route;
