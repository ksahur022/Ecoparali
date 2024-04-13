import express from "express";

import checkBuyer from "../middlewares/checkBuyer";
import registerBid from "../controllers/registerBid";
import manageBid from "../controllers/manageBid";

const router = express.Router();

router.post("/register", checkBuyer, registerBid)
router.get("/", checkBuyer, manageBid.GET_ALL_BIDS)
router.get("/:listingId", checkBuyer, manageBid.GET_BIDS_FOR_LISTING)

export default router;