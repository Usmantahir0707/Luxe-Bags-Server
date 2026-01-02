import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
// DO NOT re-enable urlencoded, it breaks file uploads

app.use(cookieParser());
app.use(morgan("dev"));

// Passport middleware
app.use(passport.initialize());

app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;
