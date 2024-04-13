import express, { NextFunction, Request, Response } from "express";

import Buyer from "../models/buyer";

export default async function (req: Request, res: Response, next: NextFunction) {
    try {

        const buyerId = req.headers.authorization;

        const buyer = await Buyer.findOne({ buyerId }).exec()
        if(!buyer) throw new Error("Farmer not found")

        next()

    } catch(err: any) {
        console.log(err);
        res.status(500).json({ message: err.message})
    }
}