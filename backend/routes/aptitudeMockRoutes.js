import express from "express";

import {
    getMockQuestions
} from "../controllers/aptitudeMockController.js";

const router = express.Router();

router.get(
    "/questions",
    getMockQuestions
);

export default router;