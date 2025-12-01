import express from "express";
import { initiateKhalti, verifyKhalti } from "../controllers/paymentController.js";
import { protect ,authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/khalti/initiate", protect, initiateKhalti);
router.post("/khalti/verify", protect, verifyKhalti);

export default router;