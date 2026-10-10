import express from "express";

import {
    getCodingTopics,
    getCodingQuestions,
    getSingleQuestion,
    getQuestionsByTopic,
} from "../controllers/codingController.js";

import {
    getSolvedProblems
} from "../controllers/codingController.js";


import {
    submitCode
} from "../controllers/submitController.js";


const router = express.Router();


router.get(
    "/topics",
    getCodingTopics
);


router.get(
    "/questions",
    getCodingQuestions
);


router.get(
    "/questions/:id",
    getSingleQuestion
);


router.get(
    "/topic/:topic",
    getQuestionsByTopic
);


router.post(
    "/submit",
    submitCode
);

router.get(
"/solved",
getSolvedProblems
);

export default router;