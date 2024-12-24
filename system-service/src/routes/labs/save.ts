import { json } from "body-parser";
import express, { Request, response, Response } from "express";
import Lab from "../../models/lab";

const router = express.Router();

router.use(json());

router.post("/", async (req: Request, res: Response) => {
	console.log(req.body);
	const labName =
		typeof req.body.labName == "string" && req.body.labName.trim().length > 0
			? req.body.labName.trim()
			: false;
	const branchName =
		typeof req.body.branchName == "string" &&
		req.body.branchName.trim().length > 0
			? req.body.branchName.trim()
			: false;
	const category =
		typeof req.body.category == "string" && req.body.category.trim().length > 0
			? req.body.category.trim()
			: false;

	if (labName && branchName && category) {
		const newLab = await Lab.create({
			name: labName,
			branch: branchName,
			category,
		});

		newLab
			.save()
			.then(() => {
				res.status(200).send();
			})
			.catch((err) => {
				console.log(err);
				res.status(500);
				res.json({
					message: "Failed to save lab to data base",
				});
			});
	} else {
		res.status(400);
		res.json({
			message: "Missing or invalid required parameters",
		});
	}
});

router.put("/", async (req: Request, res: Response) => {
	const labId =
		typeof req.body.labId == "string" && req.body.labId.trim().length == 24
			? req.body.labId.trim()
			: false;
	const labName =
		typeof req.body.labName == "string" && req.body.labName.trim().length > 0
			? req.body.labName.trim()
			: false;
	const branchName =
		typeof req.body.branchName == "string" &&
		req.body.branchName.trim().length > 0
			? req.body.branchName.trim()
			: false;
	const category =
		typeof req.body.category == "string" && req.body.category.trim().length > 0
			? req.body.category.trim()
			: false;

	if (labId && (labName || branchName || category)) {
		let updates: { labName?: string; branchName?: string; category?: string } =
			{};

		if (labName) updates["labName"] = labName;
		if (branchName) updates["branchName"] = branchName;
		if (category) updates["category"] = category;

		const updatedLab = await Lab.findByIdAndUpdate(labId, updates).catch(
			(err: Error) => {
				console.log(err);
				return false;
			}
		);

		if (updatedLab) {
			res.json(updatedLab);
		} else {
			res.status(500);
			res.json({
				message: "Failed to update lab",
			});
		}
	} else {
		res.status(400);
		let response = { message: "" };

		if (labId) {
			response.message = "Atleast one parameter is required.";
		} else {
			response.message = "Missing or invalid lab Id";
		}

		res.json(response);
	}
});

export { router as saveLabRouter };
