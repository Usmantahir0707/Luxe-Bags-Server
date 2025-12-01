import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

// Multer disk storage
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/", upload.single("image"), uploadImage);

export default router;
