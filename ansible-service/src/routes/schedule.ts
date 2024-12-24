import { Router, Request, Response } from "express";
import { json } from "body-parser";
import Schedule from "../models/schedule";
import { Deployer } from "../lib/schedulers";
import { cancel } from "../lib/workers";
import { Schema } from "mongoose";

const router = Router();
router.use(json());

router.post("/", async (req: Request, res: Response) => {
  const { topic, scheduledBy, from, to, labId, imageId } = req.body;

  // Check if nothing is scheduled in that window for that lab
  const schedules = await Schedule.find({
    labId,
    $or: [
      { from },
      { to },
      { $and: [{ from: { $lt: to } }, { to: { $gt: to } }] },
      { $and: [{ from: { $lt: from } }, { to: { $gt: from } }] },
    ],
  }).catch((err: any) => {
    console.log(err);
    return;
  });

  if (!schedules) {
    res.status(500);
    res.json({
      message: "Failed to check if the given schedule window is available",
    });
    return res.end();
  }

  if (schedules.length != 0) {
    res.status(400);
    res.json({
      message: "Given window is occupied by another schedule",
    });
    return res.end();
  }

  const scheduleDoc = new Schedule({
    topic,
    scheduledBy,
    from,
    to,
    labId,
    imageId
  })

  const result = await Deployer(from, labId, imageId, scheduleDoc._id);

  if (!result.success) {
    res.status(500);
    res.json({
      message: result.msg,
    });
    return res.end();
  }

  scheduleDoc.taskId = result.id!;

  const success = scheduleDoc.save().then(() => { return true }).catch(err => {
    // console.log(err)
    return false;
  })

  if (!success) {
    res.status(500);
    res.json({
      message: "Scheduled but failed to save",
    });
    return res.end();
  }

  res.end();
});

router.post("/check", async (req: Request, res: Response) => {
  const { from, to, labId } = req.body;

  // Check if nothing is scheduled in that window for that lab
  const schedules = await Schedule.find({
    labId,
    $or: [
      { from },
      { to },
      { $and: [{ from: { $lt: to } }, { to: { $gt: to } }] },
      { $and: [{ from: { $lt: from } }, { to: { $gt: from } }] },
    ],
  }).catch((err: any) => {
    console.log(err);
    return;
  });

  if (!schedules) {
    res.status(500);
    res.json({
      message: "Failed to check if the given schedule window is available",
    });
    return res.end();
  }

  if (schedules.length == 0) {
    res.status(200);
    res.json({
      available: true,
    });
    res.end();
  } else {
    res.status(200);
    res.json({
      available: false,
    });
    res.end();
  }
});

// route to get current scheduled deployments
router.get("/current", async (req: Request, res: Response) => {
  // if is scheduled by admin then return all
  let schedules;
  if (req.query.scheduledBy === "admin") {
    schedules = await Schedule.find({
      $and: [{ from: { $lt: new Date() } }, { to: { $gt: new Date() } }],
    }).catch((err: any) => {
      console.log(err);
      return;
    });
  }

  // if is scheduled by user(instructor) then return only his scheduled deployments

  //@ts-ignore
  // const id = new Schema.Types.ObjectId(req.query.scheduledBy);

  schedules = await Schedule.find({
    $and: [{ from: { $lte: new Date() } }, { to: { $gt: new Date() } }],
    scheduledBy: req.query.scheduledBy,
  }).catch((err: any) => {
    console.log(err);
    return;
  });

  if (!schedules) {
    res.status(500);
    res.json({
      message: "Failed to get current scheduled deployments",
    });
    return res.end();
  }

  res.status(200);
  res.json(schedules);
  res.end();
});

// route to get past scheduled deployments
router.get("/past", async (req: Request, res: Response) => {
  // if is scheduled by admin then return all
  if (req.query.scheduledBy === "admin") {
    const schedules = await Schedule.find({
      to: { $lt: new Date() },
    }).catch((err: any) => {
      console.log(err);
      return;
    });
  }

  //@ts-ignore
  // const id = new Schema.Types.ObjectId(req.query.scheduledBy);

  // if is scheduled by user(instructor) then return only his scheduled deployments
  const schedules = await Schedule.find({
    to: { $lt: new Date() },
    scheduledBy: req.query.scheduledBy,
  }).catch((err: any) => {
    console.log(err);
    return;
  });

  if (!schedules) {
    res.status(500);
    res.json({
      message: "Failed to get past scheduled deployments",
    });
    return res.end();
  }

  res.status(200);
  res.json(schedules);
  res.end();
});

// route to get upcoming scheduled deployments
router.get("/upcoming", async (req: Request, res: Response) => {
  // if is scheduled by admin then return all
  if (req.query.scheduledBy === "admin") {
    const schedules = await Schedule.find({
      from: { $gt: new Date() },
    }).catch((err: any) => {
      console.log(err);
      return;
    });
  }

  //@ts-ignore
  // const id = new Schema.Types.ObjectId(req.query.scheduledBy);

  // if is scheduled by user(instructor) then return only his scheduled deployments
  const schedules = await Schedule.find({
    from: { $gt: new Date() },
    scheduledBy: req.query.scheduledBy,
  }).catch((err: any) => {
    console.log(err);
    return;
  });

  if (!schedules) {
    res.status(500);
    res.json({
      message: "Failed to get upcoming scheduled deployments",
    });
    return res.end();
  }

  res.status(200);
  res.json(schedules);
  res.end();
});

// route to delete the schedule document by id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  // only delete schedule if its past or current
  const schedule = await Schedule.findById(id).catch((err: any) => {
    console.log(err);
    return;
  });

  if (!schedule) {
    res.status(500);
    res.json({
      message: "Failed to delete schedule",
    });
    return res.end();
  }

  if (schedule.from < new Date()) {
    res.status(500);
    res.json({
      message: "Cannot delete past or current schedule",
    });
    return res.end();
  }

  const scheduleDoc = await Schedule.findByIdAndDelete(id).catch((err: any) => {
    console.log(err);
    return;
  });

  if (!scheduleDoc) {
    res.status(500);
    res.json({
      message: "Failed to delete schedule",
    });
    return res.end();
  }

  cancel(scheduleDoc.taskId);

  res.json({
    scheduleDoc,
  });
  res.end();
});

export { router as schedulerRouter };
