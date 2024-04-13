import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import farmerRouter from "./routes/farmer";
import buyerRouter from "./routes/buyer"
import listingRouter from "./routes/listing"
import bidRouter from "./routes/bidder"

import Listing from "./models/stubble";
import Farmer from "./models/farmer";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');


app.use(express.json());

app.get("index.html", (req, res) => {
    res.redirect("/")
})

app.use((req, res, next) => {
    if (req.path.endsWith('.html')) {
        let newUrl = req.path.slice(0, -5); // Remove the last 5 characters (.html)
        if(newUrl === "index") newUrl = "/"
        return res.redirect(301, newUrl); // Use a 301 redirect for permanent redirect
    }
    next(); // Continue to other routes if not a .html request
});

app.get("/", (req: Request, res: Response) => {
  res.render("pages/index")
});

app.get("/about", (req: Request, res: Response) => {
    res.render("pages/about")
})

app.get("/contact", (req: Request, res: Response) => {
    res.render("pages/contact")
})

app.get("/blog", (req: Request, res: Response) => {
    res.render("pages/blog")
})

app.get("/service", (req: Request, res: Response) => {
    res.render("pages/service")
})

app.get("/ctof", async (req, res) => {

    const listing = await Listing.find({}).exec()

    if(!listing) res.redirect("/")
    const newArr = []

    for (let i = 0; i < listing.length; i++) {
        const {farmerId} = listing[i];
        const farmer = await Farmer.findOne({farmerId}).exec();

        if(!farmer) continue;

        newArr.push({...listing[i], farmerDetails: farmer})
    }

    console.log(newArr)

    res.render("pages/ctof", {listing: newArr})
})

app.get("/products", (req, res) => {
    res.render("pages/products")
})

app.get("/partners", (req, res) => {
    res.render("pages/partners")
})

app.get("/detail", (req, res) => {
    res.render("pages/detail")
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
