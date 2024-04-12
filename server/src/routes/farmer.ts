import express from "express";

import registerFarmer from "../controllers/registerFarmer";
import loginFarmer from "../controllers/loginFarmer";

const router = express.Router();

router.post("/register", registerFarmer)
router.post("/login", loginFarmer)

export default router;