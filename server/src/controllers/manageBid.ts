import express, { Request, Response } from "express";
import Joi from "joi";

import Bid from "../models/bidder";

const getAllBidsForListing = async (req: Request, res: Response) => {
    try {
        
        const listingId = req.params.listingId;

        const bids = await Bid.find({ listingId }).exec();
    
        // const { error } = schema.validate(req.body);
        // if (error) throw new Error(error.message);
    
        res.status(200).json({ bids, listingId });
    
        // const bids = await Bid.find({ listingId }).exec();
        // res.status(200).json({ bids });
    
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const getAllBids = async (req: Request, res: Response) => {
    try {
        
        const bids = await Bid.find({ }).exec();
    
        // const { error } = schema.validate(req.body);
        // if (error) throw new Error(error.message);
    
        res.status(200).json({ bids });
    
        // const bids = await Bid.find({ listingId }).exec();
        // res.status(200).json({ bids });
    
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const deleteBid = async function (req: Request, res: Response) {
    try {

        const bidId = req.params.bidId;

        if(!bidId) throw new Error("Bid ID is required")

        await Bid.findOneAndDelete({ bidId }).exec();
        res.status(200).json({ message: "Bid deleted successfully" });

    } catch(err: any) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}


export default {
    GET_BIDS_FOR_LISTING: getAllBidsForListing,
    GET_ALL_BIDS: getAllBids,
    DELETE: deleteBid
}