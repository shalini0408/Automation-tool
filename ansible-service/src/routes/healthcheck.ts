import { Router, Request, Response } from "express";
import { json } from "body-parser";
import { checkLabHealth } from "../lib/Ansible/CheckHealth";

const router = Router();
router.use(json());

router.post("/", async (req: Request, res: Response) => {
  const { labId, systemId } = req.body;

  const result = await checkLabHealth(labId, systemId);

  if (!result) {
    res.status(500);
    res.json({
      message: "Failed to run health checks",
    });
    return res.end();
  }

  res.json({
    result: {
      id: systemId,
      success: result.unreachable ? false : true
    }
  });
  res.end();
});

export { router as healthCheckRouter };
