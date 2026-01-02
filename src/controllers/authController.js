import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/emailService.js";

// Generate JWT token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// Generate verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// @desc Register a new user
// @route POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    const verificationToken = generateVerificationToken();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpires,
      authProvider: 'local'
    });

    // Send verification email
    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail registration if email fails, but user needs to verify later
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
      message: "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login user
// @route POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check if user is verified (only for local auth)
    if (user.authProvider === 'local' && !user.verified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
        needsVerification: true
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get current user profile
// @route GET /api/auth/me
export const getCurrentUser = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authorized" });

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};

// @desc Update logged-in user
// @route PUT /api/auth/me
export const updateUser = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authorized" });

  const { name, email, password } = req.body;

  if (name) req.user.name = name;
  if (email) req.user.email = email;
  if (password) req.user.password = password;

  await req.user.save();

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};

// @desc Delete logged-in user
// @route DELETE /api/auth/me
export const deleteUser = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authorized" });

  await User.findByIdAndDelete(req.user._id);

  res.json({ message: "User deleted successfully" });
};

// Admin: get all users
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Admin: delete any user
export const deleteUserByAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await User.findByIdAndDelete(req.params.id);

  res.json({ message: "User deleted successfully" });
};

// @desc Verify email
// @route POST /api/auth/verify-email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Verification token is required" });
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification token" });
    }

    // Update user as verified
    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.json({
      message: "Email verified successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Resend verification email
// @route POST /api/auth/resend-verification
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(user.email, verificationToken);
      res.json({ message: "Verification email sent successfully" });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      res.status(500).json({ message: "Failed to send verification email" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
