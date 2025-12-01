import express from "express";
import {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  togglePublishCourse
} from "../controllers/courseController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllCourses);
router.get("/:id", protect, getSingleCourse); // show preview based on login

// Mentor / Admin
router.post("/", protect, authorize("mentor", "admin"), createCourse);
router.put("/:id", protect, authorize("mentor", "admin"), updateCourse);
router.delete("/:id", protect, authorize("mentor", "admin"), deleteCourse);

// Publish toggle
router.patch("/:id/publish", protect, authorize("mentor", "admin"), togglePublishCourse);

export default router;
