import express, { Request, Response } from "express";
import { json } from "body-parser";
import { indexLabRouter } from "./routes/labs";
import { indexSystemsRouter } from "./routes/systems";

const app = express();

app.use(json());

app.use("/api/labs", indexLabRouter)
app.use("/api/systems", indexSystemsRouter);

export { app };
