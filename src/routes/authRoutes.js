import express from "express";
import passport from "passport";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  deleteUser,
  getUsers,
  deleteUserByAdmin,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import {
  googleAuth,
  facebookAuth,
  googleAuthCallback,
  facebookAuthCallback,
} from "../controllers/socialAuthController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (logged-in users)
router.get("/me", protect, getCurrentUser);
router.put("/me", protect, updateUser);
router.delete("/me", protect, deleteUser);

// Email verification routes
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Social login routes
router.get("/google", googleAuth);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);
router.get("/facebook", facebookAuth);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  facebookAuthCallback
);

// Admin routes
router.get("/users", protect, admin, getUsers);
router.delete("/users/:id", protect, admin, deleteUserByAdmin);

export default router;
