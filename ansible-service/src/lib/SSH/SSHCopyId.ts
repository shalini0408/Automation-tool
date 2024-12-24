import { run } from "../spawner";
import path from "path";

export async function SSHCopyId(data: string[]) {
  const helperPath = path.join(__dirname, "./helper.sh");
  const result = await run(helperPath, data, {});

  return result;
}
