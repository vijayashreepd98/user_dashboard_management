import { Router, Request, Response } from "express";
import UserListAction from "../methods/userList.get/action";
import UserDetailAction from "../methods/userDetail.get/action";
import UserUpdateAction from "../methods/userUpdate.put/action";
import UserDeleteAction from "../methods/userDelete.delete/action";
import UserDeleteByIdsAction from "../methods/userDeleteByIds.delete/action";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    const result = await new UserListAction().executeMethod({
      ...req.query,
    });
    return res.status(200).send(result); // Send a response body along with the status code
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); // Handle errors gracefully
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const result = await new UserDetailAction().executeMethod({
      user_id: parseInt(req.params.id),
    });
    return res.status(200).send(result); // Send a response body along with the status code
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); // Handle errors gracefully
  }
});

router.put("/update", async (req: Request, res: Response) => {
  try {
    const result = await new UserUpdateAction().executeMethod(req.body);
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`content-type`, `application/json`);
    return res.status(200).send(result); // Send a response body along with the status code
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); // Handle errors gracefully
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    console.log(`first...`);
    const result = await new UserDeleteAction().executeMethod({
      user_id: parseInt(req.params.id),
    });
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`content-type`, `application/json`);
    return res.status(200).send(result); // Send a response body along with the status code
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); // Handle errors gracefully
  }
});

router.delete("/delete", async (req: Request, res: Response) => {
  try {
    console.log(`sfsdsd second`);
    console.log(req.body);
    const result = await new UserDeleteByIdsAction().executeMethod(req.body);
    return res.status(200).send(result); // Send a response body along with the status code
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); // Handle errors gracefully
  }
});
export default router;
