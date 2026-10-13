import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // 1. Relational link to the User who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 2. Snapshot of items ordered
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        imageUrl: { type: String, required: true },
      },
    ],

    // 3. Shipping Address details
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      pincode: { type: String, required: true },
      locality: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      addressType: { type: String, default: "Home" },
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: ["UPI", "CARD", "NET", "COD"],
      default: "COD",
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
  },
  {
    timestamps: true, // Automatically tracks createdAt (Order date)
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
