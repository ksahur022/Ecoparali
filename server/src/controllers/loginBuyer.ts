import express, { Request, Response } from "express";
import Joi from "joi";

import Buyer from "../models/buyer";
import { comparePassword } from "../utils/passwordManagement";

export default async function (req: Request, res: Response) {
  try {

    console.log("login buyer")

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) throw new Error(error.message);

    const { email, password } = req.body;

    const buyer = await Buyer.findOne({ email }).exec();

    if (!buyer) throw new Error("Invalid email or password");

    const isPasswordValid = await comparePassword(password, buyer.password);

    if (!isPasswordValid) throw new Error("Invalid email or password");

    res.status(200).json({ message: "Login successful", buyerId: buyer.buyerId });

  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}
