import express from "express";

import {
    getPlacementCompanies,
    getPlacementRounds,
    startPlacement,
    getUpcomingPlacementDrives
} from "../controllers/placementController.js";

const router = express.Router();

router.get("/companies", getPlacementCompanies);

router.get(
    "/rounds/:companyId",
    getPlacementRounds
);

router.post(
    "/start",
    startPlacement
);

router.get(
    "/drives",
    getUpcomingPlacementDrives
);

export default router;