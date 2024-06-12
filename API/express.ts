import express, { Express } from "express";
import dotenv from "dotenv";
import userRoute from "./src/routes/user.route";
import roleRoute from "./src/routes/role.route";
import bodyParser from "body-parser";

dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("content-type", "application/json");
  next();
});

// Use userRoute for /user/register  and  / user/detail path
app.use("/members", userRoute);
app.use("/roles", roleRoute);

app.use("*", (req, res) => {
  return res.send({
    responseCode: 404,
    responseMessage: `Route not exist`,
    responseData: {},
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
