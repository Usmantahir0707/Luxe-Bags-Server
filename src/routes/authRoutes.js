import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  deleteUser,
  getUsers,
  deleteUserByAdmin,
} from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (logged-in users)
router.get("/me", protect, getCurrentUser);
router.put("/me", protect, updateUser);
router.delete("/me", protect, deleteUser);

// Admin routes
router.get("/users", protect, admin, getUsers);
router.delete("/users/:id", protect, admin, deleteUserByAdmin);

export default router;
