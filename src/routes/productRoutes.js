import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Create product
router.post("/", adminAuth, createProduct);

// Get all products
router.get("/", getProducts);

// Get single product
router.get("/:id", getProduct);

// Update product
router.put("/:id", adminAuth, updateProduct);

// Delete product
router.delete("/:id", adminAuth, deleteProduct);

export default router;
