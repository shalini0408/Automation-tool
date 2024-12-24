import { json } from "body-parser";
import express, { Request, Response } from "express";
import { getLabRouter } from "./get";
import { saveLabRouter } from './save';
import { addSystemsRouter } from './addSystems'
const router = express.Router();

router.use(json());

router.use(saveLabRouter);
router.use(getLabRouter);
router.use(addSystemsRouter);

export { router as indexLabRouter };