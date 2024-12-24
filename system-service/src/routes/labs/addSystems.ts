import { json } from "body-parser";
import express, { Request, Response } from "express";
import Lab from "../../models/lab";

const router = express.Router();

router.use(json());

router.post("/addsystems", async (req: Request, res: Response) => {
  const { systemIds, labId } = req.body;

  const success = await Lab.findByIdAndUpdate(labId, {
    $push: {
      systems: {
        $each: systemIds,
      },
    },
  }).catch(console.error);

  if (!success) {
    res.status(500);
    res.json({
      message: "Failed to updated lab systems",
    });
    return res.end();
  }

  res.end();
});

export { router as addSystemsRouter };
