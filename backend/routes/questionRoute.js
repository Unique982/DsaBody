import express from "express";
import { addQuestion, getAllQuestions } from "../controllers/questionController.js";

const router = express.Router();

router.route("/get/all").get(getAllQuestions);

router.route("/add").post(addQuestion);

export default router;
