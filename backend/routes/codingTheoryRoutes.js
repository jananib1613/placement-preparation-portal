import express from "express";

import {
    getTheoryQuestions
}
from "../controllers/codingTheoryController.js";


const router = express.Router();


router.get(
    "/:topic",
    getTheoryQuestions
);


export default router;