import express, {Request, Response} from "express";
import Joi from "joi";
import { v4 as uuidv4 } from 'uuid';

import Stubble from "../models/stubble"

export default async function(req: Request, res: Response) {
    try {

        const farmerId = req.headers.authorization;

        const schema = Joi.object({
            cropType: Joi.string().required(),
            landArea: Joi.number().required(),
        })

        const {error} = schema.validate(req.body);
        if(error) throw new Error(error.message);

        const {cropType, landArea} = req.body;
        let minPrice = landArea * 10 * 250;
        let maxPrice = landArea * 15 * 250;

        const newListing = new Stubble({
            farmerId,
            listingId: uuidv4(),
            cropType,
            landArea,
            price: {
                minPrice,
                maxPrice
            },
        })

        await newListing.save();
        
        res.status(201).json({message: "Stubble listed successfully", stubble: newListing})

    } catch(err: any) {
        console.log(err);
        res.status(500).json({ message: err.message})
    }
}