import { json } from "body-parser";
import Containers from "../../models/container";
import express, { Request, Response } from "express";
import { createContainerRouter } from "./create";
import { allocateContainerRouter } from "./allocate";
import { saveContainerRouter } from "./save";
import { stopContainerRouter } from "./stop";
import ContainerModel from "../../models/container";
import { startContainerRouter } from "./start";

const router = express.Router();

router.use(json());
// router.use(createContainerRouter);
router.use(allocateContainerRouter);
router.use(saveContainerRouter);
router.use(stopContainerRouter);
router.use(startContainerRouter);

router.get("/", async (req: Request, res: Response) => {
  const { userId } = req.query;

  if (userId) {
    const userContainers = await ContainerModel.find({}).catch((err: any) => {
      console.log(err);
    });

    if (userContainers) {
      res.json(userContainers);
    } else {
      res.status(500);
      res.json({
        message: "Failed to fetch containers from database",
      });
    }
  } else {
    res.status(400);
    res.json({
      message: "Invalid or missing user id.",
    });
  }
});

export { router as indexContainerRouter };
