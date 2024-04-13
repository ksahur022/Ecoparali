import mongoose from "mongoose";

const stubbleSchema = new mongoose.Schema({
    farmerId: {
        type: String,
        required: true
    },
    listingId: {
        type: String,
        unique: true,
        required: true
    },
    cropType: {
        type: String,
        required: true
    },
    landArea: {
        type: Number,
        required: true
    },
    price: {
        minPrice: Number,
        maxPrice: Number,
    },
    currentBid: {
        type: Number,
        default: 0
    }
})

const Stubble = mongoose.model("Stubble", stubbleSchema);
export default Stubble;