import express from "express";
import {
  getHRQuestions,
  submitHRAnswers,
  getHRHistory
} from "../controllers/hrController.js";

const router = express.Router();

// Get all HR questions
router.get("/questions", getHRQuestions);

// Submit HR answers
router.post("/submit", submitHRAnswers);

router.get("/history/:userId", getHRHistory);

export default router;