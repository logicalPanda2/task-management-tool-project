import cookieParser from "cookie-parser";
import express from "express";
import logMiddleware from "./shared/logMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(logMiddleware);

export default app;
