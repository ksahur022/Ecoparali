import mongoose from "mongoose";
import IsEmail from "isemail";

import { hashPassword } from "../utils/passwordManagement";

const buyerSchema = new mongoose.Schema({
  companyName: {
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
  phone: {
    type: String,
  },
  ownerName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    min: [8, "Password must be at least 8 characters"],
  },
  address: {
    street: String,
    city: String,
    state: String,
    pinCode: String,
    country: String,
  },
  buyerId: {
    type: String,
    unique: true,
  }
});

buyerSchema.pre("save", async function () {
  const hashedPassword = await hashPassword(this.password);
  if (hashedPassword) {
    this.password = hashedPassword;
  }
});

const Buyer = mongoose.model("buyer", buyerSchema);
export default Buyer;
