import { CronJob } from "cron";
import { track, unTrack } from "./workers";
import generateScheduleId from "../utils/makeId";
import { deployImage } from "./Ansible/DeployImage";
import axios from "axios";

export const Deployer = async (
  timeStamp: string,
  labId: string,
  imageId: string,
  scheduleId: string
) => {
  const response = await axios.get(
    `http://image-manager-srv:5000/api/image/images/${imageId}`
  );

  if (response.status != 200)
    return {
      success: false,
      msg:
        response.status == 404
          ? "No image exists with the given id"
          : "Failed to find image.",
    };

  const repo = response.data.repo;
  const registryUser = response.data.registryUser;
  const tag = response.data.tag;

  const id = generateScheduleId(24);

  const deploymentJob = new CronJob(
    new Date(timeStamp),
    async () => {
      const result = await deployImage(labId, registryUser, repo, tag, scheduleId);

      if (!result) {
        console.log("Failed to deploy image");
      } else {
        // console.log(result);
        console.log("Image deployed successfully");
      }

      onCompleteHandler(id);

      deploymentJob.stop();
    },
    null,
    true,
    "Asia/Kolkata"
  );

  track({
    id,
    job: deploymentJob,
  });

  return {
    success: true,
    id,
  };
};

function onCompleteHandler(id: string) {
  unTrack(id);
}
