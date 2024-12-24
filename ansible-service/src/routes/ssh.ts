import { Router, Request, Response } from "express";
import { json } from "body-parser";
import { SSHCopyId } from "../lib/SSH/SSHCopyId";

const router = Router();
router.use(json());

router.post("/sendpublickeys", async (req: Request, res: Response) => {
  const { sysDocs } = req.body;

  console.log(sysDocs);

  const data = sysDocs.map((sysDoc: any) => {
    return sysDoc.password + "," + sysDoc.userName + "," + sysDoc.ipAddress;
  });

  console.log(data);

  const result = await SSHCopyId(data);

  console.log(result);

  res.end();
});

export { router as SSHRouter };
