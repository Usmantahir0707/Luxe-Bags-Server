import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes (require login)
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      // Continue to next middleware/route handler
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Admin middleware (require admin role)
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // allow access
  } else {
    return res.status(403).json({ message: "Admin access required" });
  }
};
