import express from "express";
import { initiateKhalti, verifyKhalti, getAllPayments,initiateStripe } from "../controllers/paymentController.js";
import { protect ,authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/khalti/initiate", protect, initiateKhalti);
router.post("/khalti/verify", protect, verifyKhalti);
router.post("./stripe",initiateKhalti)

export default router;