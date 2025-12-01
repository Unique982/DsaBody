import express from "express";
import { 
    signup, 
    login, 
    googleLogin, // <-- Added Google Login Import
    logout, 
    getMe, 
    buyMembership 
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleLogin); // <-- Added Google Login Route
router.post("/logout", logout);

// Protected Routes (Require Login)
router.get("/me", protect, getMe);
router.post("/membership/buy", protect, buyMembership);

export default router;