import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Both routes are protected by JWT middleware!
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

export default router;
