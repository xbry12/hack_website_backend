const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: { type: Number, required: true }, // Referring to Fake Store API product IDs
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Pending" }, // E.g., Pending, Shipped, Delivered
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
