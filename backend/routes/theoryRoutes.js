import express from "express";

import {
    submitTheoryTest
} from "../controllers/theoryController.js";

const router = express.Router();

router.post(
    "/submit",
    submitTheoryTest
);

export default router;