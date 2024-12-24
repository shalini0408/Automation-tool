import axios, { AxiosResponse } from "axios";
import { json } from "body-parser";
import express, { Request, response, Response } from "express";

const router = express.Router();
router.use(json());

router.post("/save", async (req: Request, res: Response) => {
  const { containerId, userId, tag } = req.body;

  const rn = Math.floor(Math.random() * 10000 + 1);
  await axios
    .post("http://13.232.217.78:3000/api/container/commit", {
      containerId,
      imageName: tag,
      userId,
    })
    .then(async ({ data }: AxiosResponse) => {
      console.log(data);
      res.json(...data).end();
    })
    .catch((err: Error) => {
      res.status(500).json({ err: err }).end();
    });
});

export { router as saveContainerRouter };
