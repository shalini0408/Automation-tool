import express, { Request, Response } from "express";
import { json } from "body-parser";
import { indexImageRouter } from "./routes/images/index";
import { indexContainerRouter } from "./routes/containers";

const app = express();

app.use(json());
app.use("/api/image/images", indexImageRouter);
app.use("/api/image/containers", indexContainerRouter);

export { app };
