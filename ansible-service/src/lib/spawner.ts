import { spawn } from "child_process";

interface OutputI {
  stdout: string[];
  stderr: string[];
}

export const run = (command: string, args: string[] = [], options: object) =>
  new Promise<{ code: Number | null; outputs: OutputI }>((resolve, reject) => {
    try {
      const child = spawn(command, args, options);

      let outputs: OutputI = {
        stdout: [],
        stderr: [],
      };

      child.stdout.on("data", (data) => outputs.stdout.push(data.toString()));
      child.stderr.on("data", (data) => outputs.stderr.push(data.toString()));

      child.on("exit", (code) => {
        resolve({
          code,
          outputs,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
