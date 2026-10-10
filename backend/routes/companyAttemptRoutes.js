import express from "express";
import { 
    saveCompanyAttempt,
    getCompanyAttempts
} from "../controllers/companyAttemptController.js";


const router = express.Router();


router.post("/attempt", saveCompanyAttempt);


// GET attempts by user
router.get("/attempts/:user_id", getCompanyAttempts);


export default router;