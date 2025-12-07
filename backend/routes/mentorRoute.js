import express from "express";
import { requestSession, approveSession } from "../controllers/mentorController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/request", protect, requestSession);
router.put("/approve/:sessionId", protect, authorize('mentor'), approveSession);

export default router;