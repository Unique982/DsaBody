import express from "express";
// import { registerAdmin, loginAdmin, getAllUsers } from "../Controller/adminController.js";
//import { protect } from "../middleware/authMiddleware.js";
//import { checkRole } from "../middleware/roleMiddleware.js";
import { registerAdmin, loginAdmin, getAllUsers } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/users", protect, checkRole("admin"), getAllUsers);

export default router;
