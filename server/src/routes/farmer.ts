import express from "express";

import registerFarmer from "../controllers/registerFarmer";
import loginFarmer from "../controllers/loginFarmer";
import manageFarmer from "../controllers/manageFarmer";

const router = express.Router();

router.post("/register", registerFarmer)
router.post("/login", loginFarmer)

router.put("/update", manageFarmer.UPDATE)
router.get("/", manageFarmer.GET_ALL)
router.get("/info", manageFarmer.GET_INFO)

export default router;