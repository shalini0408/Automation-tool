import express from "express";
import { json } from "body-parser";
import Schedule from "../models/schedule";
import { Schema } from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.query.role === "admin") {
    Schedule.find({})
      .then((schedules: any) => {
        res.json(schedules);
      })
      .catch((err: any) => {
        res.json(err);
      });
    return;
  }

  // @ts-ignore
  const id = new Schema.Types.ObjectId(req.query.scheduledBy);

  Schedule.find({
    scheduledBy: id,
  })
    .then((schedules: any) => {
      res.json(schedules);
    })
    .catch((err: any) => {
      res.json(err);
    });
});

export { router as getRouter };
