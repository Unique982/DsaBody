import express from "express";
// import { registerAdmin, loginAdmin, getAllUsers } from "../Controller/adminController.js";
//import { protect } from "../middleware/authMiddleware.js";
//import { checkRole } from "../middleware/roleMiddleware.js";
import { registerAdmin, loginAdmin, getAllUsers ,getDashboardStats, updateUserRole, logoutAdmin} from "../controllers/adminController.js";
import { protect,authorize} from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";

const router = express.Router();
router.use(protect,authorize("admin"));

router.get("/dashboard", getDashboardStats);
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/users", protect, checkRole("admin"), getAllUsers);
router.post("/logout", loginAdmin);

export default router;


