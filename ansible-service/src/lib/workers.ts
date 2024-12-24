import { CronJob } from "cron";
import Schedule from "../models/schedule";
import { Deployer } from "./schedulers";

export interface ScheduleI {
  id: string;
  job: CronJob;
}

export let schedules: ScheduleI[] = [];

export function track(schedule: ScheduleI) {
  schedules.push(schedule);
}

export function unTrack(id: string) {
  schedules = schedules.filter((schedule) => schedule.id != id);
}

export function cancel(id: string) {
  const temp = schedules.find((schedule) => schedule.id == id);

  temp?.job.stop();

  unTrack(id);
}

// Function to pull upcoming schedules from db and queue them
async function fetch() {
  const schedules = await Schedule.find({
    from: { $gt: new Date() },
  }).catch((err) => {
    // console.log(err);
    return;
  });

  if (!schedules) {
    console.log("Failed to fetch the schedules from db");
    return;
  }

  schedules.forEach(async (schedule) => {
    const result = await Deployer(
      String(schedule.from),
      String(schedule.labId),
      String(schedule.imageId),
      String(schedule._id)
    );

    if (result.success) {
      console.log(
        `[Worker Fetch] Successfully queued schedule with id ${schedule._id}`
      );
    } else {
      console.log(
        `[Worker Fetch] Failed to queue schedule with id ${schedule._id}`
      );
    }
  });
}

export async function init(callback?: () => void) {
  // Pull upcoming schedules from db and queue them
  fetch();

  if (callback) {
    callback();
  }
}
