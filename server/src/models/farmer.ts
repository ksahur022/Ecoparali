import mongoose from "mongoose";
import IsEmail from "isemail";

import { hashPassword } from "../utils/passwordManagement";

const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => {
        return IsEmail.validate(v);
      },
      message: (props: any) => `${props.value} is not a valid email address`,
    },
  },
  farmerId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: [8, "Password must be at least 8 characters"],
  },
  phone: {
    type: String,
    // required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    pinCode: String,
    country: String,
  }
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

farmerSchema.pre("save", async function () {
  const hashedPassword = await hashPassword(this.password);
  if (hashedPassword) {
    this.password = hashedPassword;
  }
});

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
