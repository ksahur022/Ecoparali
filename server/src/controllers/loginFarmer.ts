import express, { Request, Response } from "express";
import Joi from "joi";

import Farmer from "../models/farmer";
import { comparePassword } from "../utils/passwordManagement";

export default async function (req: Request, res: Response) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) throw new Error(error.message);

    const { email, password } = req.body;

    const farmer = await Farmer.findOne({ email }).exec();

    if (!farmer) throw new Error("Invalid email or password");

    const isPasswordValid = await comparePassword(password, farmer.password);

    if (!isPasswordValid) throw new Error("Invalid email or password");

    res.status(200).json({ message: "Login successful", farmerId: farmer.farmerId });

  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}
