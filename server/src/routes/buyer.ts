import express from "express";

import registerBuyer from "../controllers/registerBuyer";
import loginBuyer from "../controllers/loginBuyer";
import manageBuyer from "../controllers/manageBuyer";

const router = express.Router();

router.post("/register", registerBuyer)
router.post("/login", loginBuyer)

router.put("/update", manageBuyer.UPDATE)
router.get("/", manageBuyer.GET_ALL)
router.get("/info", manageBuyer.GET_INFO)

export default router;