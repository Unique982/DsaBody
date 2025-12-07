import express from "express";
import { 
    getQuestions,       // Renamed from getAllQuestions in the modern controller
    addQuestion,        // Used for CRUD Create
    submitPractice      // New function for submitting code
} from "../controllers/questionController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==============================================
// PUBLIC & GENERAL ACCESS ROUTES
// ==============================================

// GET /api/questions - Fetch all questions (with optional filtering by tags/difficulty via query params)
router.get("/", getQuestions);

// POST /api/questions/:id/submit - Submit user code for a question (Public for demo mode)
router.post("/:id/submit", protect, submitPractice);

// ==============================================
// RESTRICTED ROUTES (ADMIN / MENTOR ONLY)
// ==============================================

// POST /api/questions - Create a new question
// Requires user to be logged in (protect) and have a role of 'admin' or 'mentor' (authorize)
router.post("/", protect, authorize('admin'), addQuestion); 
// Note: You would typically add PUT and DELETE routes here, also protected.
// e.g., router.put("/:id", protect, authorize('admin', 'mentor'), updateQuestion);
// e.g., router.delete("/:id", protect, authorize('admin'), deleteQuestion);

export default router;