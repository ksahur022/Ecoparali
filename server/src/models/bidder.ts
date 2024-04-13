import mongoose from "mongoose";

const bidderSchema = new mongoose.Schema({
  bidId: {
    type: String,
    required: true,
    unique: true,
  },
  listingId: {
    type: String,
    required: true,
  },
  buyerId: {
    type: String,
    required: true,
  },
  bidAmount: {
    type:  Number,
  },
  bidder: {
    companyName: {
      type: String,
      required: true,
    },
    email: String,
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        pinCode: String,
        country: String,
    }
  },
  bidTime: {
    type: Date,
    default: Date.now
  }
});

const Bidder = mongoose.model("Bidder", bidderSchema);
export default Bidder;
