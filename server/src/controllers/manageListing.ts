import express, { Request, Response } from "express";
import Joi from "joi";

import Listing from "../models/stubble";

const getAllListings = async function (req: Request, res: Response) {
  try {
    const listings = await Listing.find({}).exec();
    res.status(200).json({ listings });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getListingsForFarmer = async function (req: Request, res: Response) {
  try {
    const farmerId = req.params.farmerId;

    const listings = await Listing.find({ farmerId }).exec();
    res.status(200).json({ listings, farmerId });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteListing = async function (req: Request, res: Response) {
    try {

        const listingId = req.params.listingId;

        if(!listingId) throw new Error("Listing ID is required")

        await Listing.findOneAndDelete({ listingId }).exec();

        res.status(200).json({ message: "Listing deleted successfully" });
    } catch(err: any) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

export default {
    GET_ALL: getAllListings,
    GET_LISTINGS_FOR_FARMER: getListingsForFarmer,
    DELETE: deleteListing
}
