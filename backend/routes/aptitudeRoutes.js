import express from "express";

import {
  getTopics,
  getQuestions,
  getTests,
  submitAttempt,
  getAptitudeProgress,
  getDashboardStats,
  getAttempts
} from "../controllers/aptitudeController.js";


const router = express.Router();

router.get("/topics", getTopics);

router.get("/questions/:topic_id", getQuestions);

router.get("/tests/:topic_id", getTests);

router.post("/submit", submitAttempt);

router.get("/attempts/:userId", getAttempts);

router.get("/dashboard/:userId", getDashboardStats);

router.get("/progress/:userId", getAptitudeProgress);

export default router;