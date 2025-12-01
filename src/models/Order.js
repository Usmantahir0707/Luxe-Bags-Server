import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },

    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        color: { type: String },
        size: { type: String },
      },
    ],

    totalPrice: { type: Number, required: true },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    },

    cancelledAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
