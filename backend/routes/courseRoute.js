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
router.post("/", protect, authorize( "admin"), createCourse);
router.put("/:id", protect, authorize("admin"), updateCourse);
router.delete("/:id", protect, authorize("admin"), deleteCourse);

// Publish toggle
router.patch("/:id/publish", protect, authorize("admin"), togglePublishCourse);

export default router;
