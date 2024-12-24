import express, { Request, Response } from "express";
import { json } from "body-parser";

const router = express.Router();
router.use(json());

router.get("/", (req: Request, res: Response) => {
  res.end();
})

export { router as pingServiceRouter };
