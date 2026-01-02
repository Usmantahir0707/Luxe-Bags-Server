import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Multer disk storage
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/", adminAuth, upload.single("image"), uploadImage);

export default router;
