import express, { Request, Response } from "express";
import Joi from "joi";

import Farmer from "../models/farmer";

const updateFarmerInfo = async function (req: Request, res: Response) {
  try {
    const farmerId = req.headers.authorization;

    const schema = Joi.object({
      name: Joi.string().required(),
      phone: Joi.string(),
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

    const { name, phone, address } = req.body;
    const updateFarmer = await Farmer.findOneAndUpdate(
      { farmerId },
      { $set: { name, phone, address } }
    ).exec();

    if (!updateFarmer) throw new Error("Farmer not found");

    res.status(200).json({ message: "Farmer info updated successfully" });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllFarmers = async function (req: Request, res: Response) {
  try {
    const farmers = await Farmer.find({}).exec();
    res.status(200).json({ farmers });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getFarmerInfo = async function (req: Request, res: Response) {
    try {
        const farmerId = req.headers.authorization;
        const farmer = await Farmer.find({farmerId}).exec();
        if(!farmer) throw new Error("Farmer not found")
        res.status(200).json({ farmer });
      } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.message });
      }
}

export default {
    UPDATE: updateFarmerInfo,
    GET_ALL: getAllFarmers,
    GET_INFO: getFarmerInfo
}
