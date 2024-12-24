import express, { Request, Response } from "express";
import System from "../../models/system";

const router = express.Router();

router.get("/get", async (req: Request, res: Response) => {
	const systemsDoc = await System.find({}, "categoryName").catch(console.error);
	if (systemsDoc) {
		res.json({
			systems: systemsDoc,
		});
		res.end();
	} else {
		res.status(500);
		res.json({
			message: "Failed to fetch systems from DB",
		});
		res.end();
	}
});

export { router as GetSystemsRouter };
