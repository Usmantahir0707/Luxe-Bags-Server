import express from "express";
import { receiveMessage, sendMessage } from "../controllers/whatsappController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public: Receive WhatsApp messages (webhook from Twilio)
router.post("/receive", receiveMessage);

// Admin: Send WhatsApp messages to customers
router.post("/send", adminAuth, sendMessage);

export default router;
