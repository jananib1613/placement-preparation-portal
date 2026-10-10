import express from "express";

import {
    getTechnicalHistory
} from "../controllers/technicalHistoryController.js";

const router = express.Router();

router.get(
    "/history/:userId",
    getTechnicalHistory
);

export default router;