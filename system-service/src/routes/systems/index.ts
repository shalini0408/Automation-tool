import { json } from "body-parser";
import express, { Request, Response } from "express";
import { SaveSystemRouter } from "./save";
import { GetSystemsRouter } from "./get";

const router = express.Router();

router.use(json());

router.use(GetSystemsRouter);
router.use(SaveSystemRouter);

export { router as indexSystemsRouter };