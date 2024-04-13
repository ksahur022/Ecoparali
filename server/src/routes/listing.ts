import express from "express";

import registerStubble from "../controllers/registerStubble";
import checkFarmer from "../middlewares/checkFarmer";

const router = express.Router();

router.post("/register", checkFarmer, registerStubble)

export default router;