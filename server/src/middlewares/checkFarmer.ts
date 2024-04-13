import express, { NextFunction, Request, Response } from "express";

import Farmer from "../models/farmer";

export default async function (req: Request, res: Response, next: NextFunction) {
    try {

        const farmerId = req.headers.authorization;

        const farmer = await Farmer.findOne({ farmerId }).exec()
        if(!farmer) throw new Error("Farmer not found")

        next()

    } catch(err: any) {
        console.log(err);
        res.status(500).json({ message: err.message})
    }
}