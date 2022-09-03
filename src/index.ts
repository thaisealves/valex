import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import 'express-async-errors';
import route from "./routers/routersIndex.js";
import errorHandler from "./middlewares/errorHandler.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(route)
app.use(errorHandler)

const PORT: number = Number(process.env.PORT);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
