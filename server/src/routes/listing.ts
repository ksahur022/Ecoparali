import express from "express";

import registerStubble from "../controllers/registerStubble";
import checkFarmer from "../middlewares/checkFarmer";
import manageListing from "../controllers/manageListing";

const router = express.Router();

router.post("/register", checkFarmer, registerStubble)
router.get("/:farmerId", checkFarmer, manageListing.GET_LISTINGS_FOR_FARMER)
router.get("/", manageListing.GET_ALL)

router.delete("/:listingId", checkFarmer, manageListing.DELETE)

export default router;