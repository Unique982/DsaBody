import express from "express";
import { getAllMessages, MarkAsComplete, newMessage } from "../controllers/messageController.js";

const router = express.Router();

router.route("/get/all").get(getAllMessages);

router.route("/new").post(newMessage);

router.route("/mark/completed").post(MarkAsComplete);

export default router;