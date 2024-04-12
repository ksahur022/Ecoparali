import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import farmerRouter from "./routes/farmer";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Ecoparali API working" });
});

app.use("/api/farmer", farmerRouter);

mongoose.connect(process.env.MONGO_URI as string).then((data) => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}).catch((err) => {
    console.log(err)
})
