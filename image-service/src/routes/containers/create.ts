import { json } from "body-parser";
import express, { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
const router = express.Router();

router.use(json());
router.post("/create", async (req: Request, res: Response) => {
	const { baseImage, containerName } = req.body;
	axios
		.post("http://3.89.213.136:3000/api/container/create", {
			baseImage,
			containerName,
			password: "password",
			username: "guest",
		})
		.then(async ({ data }: AxiosResponse) => {
			const resData = { ...data };
			res.json(resData).end();
		})
		.catch((err) => {
			console.log(err);
		});
});

export { router as createContainerRouter };
