import { Router, Request, Response } from "express";
import { json } from "body-parser";
import { schedules } from "../lib/workers";

const router = Router();
router.use(json());

router.get("/schedules", (req: Request, res: Response) => {
  res.json({
    schedules: schedules.map((schedule) => schedule.id),
  });
  res.end();
});

export { router as workersRouter };
