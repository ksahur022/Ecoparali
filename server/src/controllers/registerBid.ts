import express, {Request, Response} from "express";
import Joi from "joi";
import { v4 as uuidv4 } from 'uuid';

import Bidder from "../models/bidder"
import Buyer from "../models/buyer"

export default async function(req: Request, res: Response) {
    try {

        const buyerId = req.headers.authorization;

        const buyer = await Buyer.findOne({ buyerId }).exec()
        if(!buyer) throw new Error("Buyer not found")

        const {companyName, email, phone, address} = buyer;

        const schema = Joi.object({
            listingId: Joi.string().required(),
            bidAmount: Joi.number().required(),
        })

        const {error} = schema.validate(req.body);
        if(error) throw new Error(error.message);

        const {listingId, bidAmount} = req.body;

        const newBid = new Bidder(
            {
                bidId: uuidv4(),
                listingId,
                bidAmount,
                buyerId,
                bidder: {companyName, email, phone, address}
            }
        )

        await newBid.save();
        
        res.status(201).json({message: "Bidder listed successfully", bid: newBid})

    } catch(err: any) {
        console.log(err);
        res.status(500).json({ message: err.message})
    }
}