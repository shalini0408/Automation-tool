import { json } from "body-parser";
import express, { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

const router = express.Router();

router.use(json());

router.post("/allocate", (req, res) => {
  const { baseImage, containerName, password, userId } = req.body;
  axios
    .post(`http://${process.env.ALLOCATOR_IP}/api/v2/container/create`, {
      baseImage,
      containerName,
      password,
      userId,
    })
    .then(async ({ data }: AxiosResponse) => {
      const resData = { ...data };
      res.json(resData).end();
    })
    .catch((err) => {
      console.log(err);
    });
});

export { router as allocateContainerRouter };
