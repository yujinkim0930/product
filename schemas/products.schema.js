import mongoose from "mongoose";

const productSchma = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    password: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["FOR_SALE", "SOLD_OUT"],
      default: "FOR_SALE",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Prod", productSchma);
