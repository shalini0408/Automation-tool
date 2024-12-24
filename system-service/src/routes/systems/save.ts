import { json } from "body-parser";
import express, { Request, Response } from "express";
import Lab from "../../models/lab";
import System from "../../models/system";
import axios from "axios";

const router = express.Router();
router.use(json());

router.post("/save", async (req: Request, res: Response) => {
  const { systems, labId } = req.body;

  if (labId === "" || labId === undefined) {
    res.json({
      status: 400,
      message: "select a lab",
    });

    return res.end();
  }

  systems.map((system: any) => {
    if (
      system.systemName === "" ||
      system.ipAddress === "" ||
      system.username === "" ||
      system.password === ""
    ) {
      res.json({
        status: 400,
        message: "missing or invalid parameters",
      });

      return res.end();
    }
  });

  const sysDocs = await System.insertMany(systems).catch(console.error);

  if (!sysDocs) {
    res.status(500);
    res.json({
      messaeg: "Failed to save systems",
    });
    return res.end();
  }

  const result = await axios.post(
    "http://ansible-srv:5000/api/deployment/ssh/sendpublickeys",
    { sysDocs }
  );

  const systemIds = sysDocs.map((sysDoc) => sysDoc._id);

  const labDoc = await Lab.findByIdAndUpdate(
    labId,
    {
      $push: {
        systems: {
          $each: systemIds,
        },
      },
    },
    { new: true }
  )
    .populate("systems")
    .catch(console.error);

  if (!labDoc) {
    res.status(500);
    res.json({
      messaeg: "Failed to add systems to lab",
    });
    return res.end();
  }

  if (result.status != 200) {
    res.status(400);
    res.json({
      lab: labDoc,
    });
    res.end();
  } else {
    res.json({
      lab: labDoc,
    });
  }
});

export { router as SaveSystemRouter };
