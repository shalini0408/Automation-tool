import { json } from "body-parser";
import express, { Request, Response } from "express";
import Lab from "../../models/lab";

const router = express.Router();

router.use(json());

router.get("/", async (req: Request, res: Response) => {
	const labs = await Lab.find()
		.limit(20)
		.sort({ name: 1 })
		.populate("systems")
		.catch((err: Error) => {
			console.log(err);
			return false;
		});

	if (labs) {
		res.json(labs);
	} else {
		res.status(500);
		res.json({
			message: "Failed to fetch labs from database",
		});
	}
});

router.get("/:id", async (req: Request, res: Response) => {
	const lab = await Lab.findById(req.params.id)
		.populate("systems")
		.catch((err: Error) => {
			console.log(err);
			return false;
		});

	if (lab) {
		res.json(lab);
	} else {
		res.status(500);
		res.json({
			message: "Failed to fetch lab from database",
		});
	}
});


export { router as getLabRouter };
