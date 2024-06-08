import { Router, Request, Response } from "express";
import MasterRolesAction from "../methods/masterRoleList.get/action";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await new MasterRolesAction().executeMethod();
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`content-type`, `application/json`);
    return res.status(200).send(result); // Send a response body along with the status code
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); // Handle errors gracefully
  }
});


export default router;
