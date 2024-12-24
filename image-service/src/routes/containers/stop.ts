import axios, { AxiosResponse } from "axios";
import { json } from "body-parser";
import express, { Request, response, Response } from "express";
import ContainerModel from "../../models/container";

const router = express.Router();
router.use(json());

router.post("/stop", async (req: Request, res: Response) => {
  const { containerId } = req.body;

  await axios
    .post("http://13.232.217.78:3000/api/container/stop", {
      containerId,
    })
    .then(async ({ data }: AxiosResponse) => {
      console.log(data);

      res.json(...data).end();
    })
    .catch((err: Error) => {
      res.status(500).json({ err: err }).end();
    });
});

export { router as stopContainerRouter };
