import express from "express";
import { getCompanyQuestions } from "../controllers/companyController.js";

const router = express.Router();


router.get("/questions/:company", getCompanyQuestions);


export default router;