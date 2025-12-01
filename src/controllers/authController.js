import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// @desc Register a new user
// @route POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
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

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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
