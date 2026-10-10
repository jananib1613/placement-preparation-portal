import express from "express";
import {
    getTechnicalTopics,
    getTechnicalQuestions,
    submitTechnicalTest,
    getTechnicalHistory
} from "../controllers/technicalController.js";

const router = express.Router();


router.get("/topics", getTechnicalTopics);

router.get("/questions/:topicId", getTechnicalQuestions);

router.post(
"/submit",
submitTechnicalTest
);

router.get(
"/history/:userId",
getTechnicalHistory
);


export default router;