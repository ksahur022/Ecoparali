import express, { Request, Response } from "express";
import Joi from "joi";

import Buyer from "../models/buyer";

const updateBuyerInfo = async function (req: Request, res: Response) {
  try {
    const buyerId = req.headers.authorization;

    const schema = Joi.object({
      ownerName: Joi.string().required(),
      phone: Joi.string(),
      description: Joi.string(),
      address: Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        pinCode: Joi.string(),
        country: Joi.string(),
      }),
    });

    const { error } = schema.validate(req.body);
    if (error) throw new Error(error.message);

    const { ownerName, phone, address, description } = req.body;
    const updateBuyer = await Buyer.findOneAndUpdate(
      { buyerId },
      { $set: { ownerName, phone, description, address } }
    ).exec();

    if (!updateBuyer) throw new Error("Buyer not found");

    res.status(200).json({ message: "Buyer info updated successfully" });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllBuyers = async function (req: Request, res: Response) {
  try {
    console.log("all buyers")
    const buyers = await Buyer.find({}).exec();
    res.status(200).json({ buyers });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getBuyerInfo = async function (req: Request, res: Response) {
    try {
        const buyerId = req.headers.authorization;
        const buyer = await Buyer.find({buyerId}).exec();
        if(!buyer) throw new Error("Buyer not found")
        res.status(200).json({ buyer });
      } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.message });
      }
}

export default {
    UPDATE: updateBuyerInfo,
    GET_ALL: getAllBuyers,
    GET_INFO: getBuyerInfo
}
