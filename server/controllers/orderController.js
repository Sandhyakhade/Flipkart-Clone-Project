import Order from "../models/Order.js";

// @desc    Create new order & save to MongoDB Atlas
// @route   POST /api/orders
// @access  Private (Requires JWT Token!)
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalAmount } =
      req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items found in request",
      });
    }

    // Create the order document linked to the authenticated req.user._id!
    const order = await Order.create({
      user: req.user._id, // Injected by our protect middleware!
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      isPaid: paymentMethod !== "COD", // Marked as paid if online payment
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully in MongoDB Atlas!",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while creating order",
      error: error.message,
    });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
      error: error.message,
    });
  }
};
