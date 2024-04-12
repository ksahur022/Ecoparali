import express, {Request, Response} from "express";
import Joi from "joi";
import { v4 as uuidv4 } from 'uuid';

import Farmer from "../models/farmer"

export default async function(req: Request, res: Response) {
    try {

        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            phone: Joi.string(),
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

        const {name, email, password, phone, address} = req.body;

        const newFarmer = new Farmer({name, email, password, phone, address, farmerId: uuidv4()})
        await newFarmer.save();
        
        res.status(201).json({message: "Farmer registered successfully", farmer: newFarmer})

    } catch(err: any) {
        console.log(err);
        res.status(500).json({ message: err.message})
    }
}