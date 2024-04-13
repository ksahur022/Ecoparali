import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import multer from "multer";

import farmerRouter from "./routes/farmer";
import buyerRouter from "./routes/buyer"
import listingRouter from "./routes/listing"
import bidRouter from "./routes/bidder"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../images');
    },
    filename: function (req, file, callback) {
        console.log("File Object",file);
        callback(null, file.originalname);
    }
});

const upload = multer({ storage })

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.render("home")
});

app.post("/upload", upload.single("pic"), async (req: Request, res: Response) => {
    try {

        console.log(req.file)

        res.status(200).json({message: "File uploaded successfully"})        

    } catch(err: any) {
        console.log(err)
        res.status(500).json({message: err.message})
    }
})

// app.
app.use("/api/farmer", farmerRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api/listing", listingRouter);
app.use("/api/bid", bidRouter);

mongoose.connect(process.env.MONGO_URI as string).then((data) => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}).catch((err) => {
    console.log(err)
})
