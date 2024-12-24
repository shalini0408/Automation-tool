import { run } from "../spawner";
import path from "path";

export async function checkLabHealth(labId: string, systemId: string) {
  const command = `ansible-playbook`;
  const options = {
    env: {
      ...process.env,
      LAB_ID: labId,
      SYSTEM_ID: systemId,
    },
  };

  const args = [
    "-i",
    path.join(__dirname, "../../utils/cli/inventory.js"),
    path.join(__dirname, "./PlayBooks/HealthCheck.yaml"),
  ];

  const result = await run(command, args, options).catch((err) => {
    // console.log(err);
    return;
  });

  if (!result) return result;

  let output: any = result!.outputs.stdout.join("");
  output = output.replace(/\r?\n|\r/g, " ");
  output = JSON.parse(output);

  const stats = output.stats;
  const key = Object.keys(stats)[0];

  return stats[key];
}
