import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// @desc Google OAuth callback
// @route GET /api/auth/google/callback
export const googleAuthCallback = async (req, res) => {
  try {
    const { id: googleId, emails, displayName } = req.user;

    // Check if user already exists
    let user = await User.findOne({ googleId });

    if (!user) {
      // Check if email already exists with local auth
      const existingUser = await User.findOne({ email: emails[0].value });

      if (existingUser) {
        return res.status(400).json({
          message: "Email already registered with local account. Please login with email/password."
        });
      }

      // Create new user
      user = await User.create({
        name: displayName,
        email: emails[0].value,
        googleId,
        verified: true, // Google accounts are pre-verified
        authProvider: 'google'
      });
    }

    // Generate token and redirect to frontend
    const token = generateToken(user._id);

    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/google/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified
    }))}`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Google auth callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

// @desc Facebook OAuth callback
// @route GET /api/auth/facebook/callback
export const facebookAuthCallback = async (req, res) => {
  try {
    const { id: facebookId, emails, displayName } = req.user;

    // Check if user already exists
    let user = await User.findOne({ facebookId });

    if (!user) {
      // Check if email already exists with local auth
      const existingUser = await User.findOne({ email: emails[0].value });

      if (existingUser) {
        return res.status(400).json({
          message: "Email already registered with local account. Please login with email/password."
        });
      }

      // Create new user
      user = await User.create({
        name: displayName,
        email: emails[0].value,
        facebookId,
        verified: true, // Facebook accounts are pre-verified
        authProvider: 'facebook'
      });
    }

    // Generate token and redirect to frontend
    const token = generateToken(user._id);

    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/facebook/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified
    }))}`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Facebook auth callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

// @desc Initiate Google OAuth
// @route GET /api/auth/google
export const googleAuth = (req, res) => {
  // This will be handled by passport
  res.status(200).json({ message: "Redirecting to Google..." });
};

// @desc Initiate Facebook OAuth
// @route GET /api/auth/facebook
export const facebookAuth = (req, res) => {
  // This will be handled by passport
  res.status(200).json({ message: "Redirecting to Facebook..." });
};
