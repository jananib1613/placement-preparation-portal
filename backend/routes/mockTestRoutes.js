import express from "express";

import {
    getMockQuestions,
    saveMockAttempt
} from "../controllers/mockTestController.js";


const router = express.Router();


// GET QUESTIONS

router.get(
    "/questions/:category",
    getMockQuestions
);


// SAVE RESULT

router.post(
    "/submit",
    saveMockAttempt
);


export default router;