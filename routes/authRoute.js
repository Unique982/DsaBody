import express from "express";
import { signup, login, logout, buyMembership } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/membership/buy", buyMembership);

export default router;
