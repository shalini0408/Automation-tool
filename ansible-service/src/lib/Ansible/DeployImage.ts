import { run } from "../spawner";
import path from "path";

export async function deployImage(labId: string, registryUser: string, repo: string, tag: string, scheduleId: string) {
  const command = 'ansible-playbook';
  const options = {
    env: {
      ...process.env,
      LAB_ID: labId
    }
  }

  const args = [
    "-i",
    path.join(__dirname, "../../utils/cli/inventory.js"),
    path.join(__dirname, "./PlayBooks/DeployImage.yaml"),
    "-e",
    `image=${registryUser}/${repo}:${tag}`,
    "-e",
    `name=${scheduleId}`
  ];

  const result = await run(command, args, options).catch(err => {
    // console.log(err);
    return;
  });

  return result;
}