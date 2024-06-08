import { Router, Request, Response } from "express";
import UserRegisterAction from "../methods/userRegister.post/action";
import UserDetailAction from "../methods/userDetail.get/action";

const router: Router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const result = await new UserRegisterAction().executeMethod(req.body);
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`content-type`, `application/json`);
    return res.status(200).send(result); // Send a response body along with the status code
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); // Handle errors gracefully
  }
});

router.get("/detail", async (req: Request, res: Response) => {
  try {
    const result = await new UserDetailAction().executeMethod(req.query);
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`content-type`, `application/json`);
    return res.status(200).send(result); // Send a response body along with the status code
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); // Handle errors gracefully
  }
});

router.get("/detailById/:id", async (req: Request, res: Response) => {
  try {
    const result = await new UserDetailAction().executeMethod({
      user_id: req.params.id,
    });
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`content-type`, `application/json`);
    return res.status(200).send(result); // Send a response body along with the status code
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); // Handle errors gracefully
  }
});

export default router;
