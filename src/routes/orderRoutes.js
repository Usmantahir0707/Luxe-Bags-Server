import express from "express";
import {
  createOrder,
  getOrderById,
  cancelOrder,
  getAllOrders,
  cancelOrderByAdmin,
  updateOrderStatus,
} from "../controllers/orderController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public create order
router.post("/", createOrder);

// Public cancel order
router.put("/:id/cancel", cancelOrder);

// Public get order by ID
router.get("/:id", getOrderById);

// Admin: Get ALL orders
router.get("/", adminAuth, getAllOrders);

// Admin: Cancel any order
router.put("/:id/admin-cancel", adminAuth, cancelOrderByAdmin);

// Admin: Update status
router.put("/:id/status", adminAuth, updateOrderStatus);

export default router;
