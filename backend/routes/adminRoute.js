import express from "express";
import { getDashboardStats, getAllUsers, updateUserRole } from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all admin routes
router.use(protect, authorize("admin"));

router.get("/dashboard", getDashboardStats);
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);

export default router;
