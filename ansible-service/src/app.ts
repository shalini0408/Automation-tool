import express from "express";
import { json } from "body-parser";

import { pingServiceRouter } from "./routes/ping";
import { schedulerRouter } from "./routes/schedule";
import { workersRouter } from "./routes/workers";
import { healthCheckRouter } from "./routes/healthcheck";
import { getRouter } from "./routes/get";
import { SSHRouter } from "./routes/ssh";

const app = express();

app.use(json());

app.use("/api/deployment", getRouter);
app.use("/api/deployment/ssh", SSHRouter);
app.use("/api/deployment/ping", pingServiceRouter);
app.use("/api/deployment/schedule", schedulerRouter);
app.use("/api/deployment/workers", workersRouter);
app.use("/api/deployment/healthcheck", healthCheckRouter);

export { app };
