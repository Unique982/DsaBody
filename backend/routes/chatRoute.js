import express from "express";
import { getChatHistory, clearChat } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All chat routes require login
router.get("/history", protect, getChatHistory);
router.delete("/clear", protect, clearChat);

export default router;