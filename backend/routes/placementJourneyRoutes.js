import express from "express";
import { getPlacementCompany } from "../controllers/placementJourneyController.js";

const router = express.Router();

router.get("/company/:companyId", getPlacementCompany);

export default router;