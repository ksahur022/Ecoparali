import express, {Request, Response} from "express";
import Joi from "joi";
import { v4 as uuidv4 } from 'uuid';

import Buyer from "../models/buyer"

export default async function(req: Request, res: Response) {
    try {

        console.log("working")

        const schema = Joi.object({
            companyName: Joi.string().required(),
            email: Joi.string().email().required(),
            ownerName: Joi.string().required(),
            description: Joi.string(),
            phone: Joi.string(),
            password: Joi.string().min(8).required(),
            address: Joi.object({
                street: Joi.string(),
                city: Joi.string(),
                state: Joi.string(),
                pinCode: Joi.string(),
                country: Joi.string()
            })
        })

        const {error} = schema.validate(req.body);
        if(error) throw new Error(error.message);

        const {companyName, email, ownerName, description, phone, password, address} = req.body;

        const newBuyer = new Buyer({companyName, email, ownerName, description, phone, password, address, buyerId: uuidv4()})
        await newBuyer.save();
        
        res.status(201).json({message: "Buyer registered successfully", buyer: newBuyer})

    } catch(err: any) {
        console.log(err);
        res.status(500).json({ message: err.message})
    }
}