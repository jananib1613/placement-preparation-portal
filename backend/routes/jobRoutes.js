import express from "express";

import {
    getJobs,
    getUserApplications,
    applyForJob
} from "../controllers/jobController.js";

const router = express.Router();


/* Get all jobs */

router.get(
    "/",
    getJobs
);


/* Get applications of a user */

router.get(
    "/applications/:userId",
    getUserApplications
);


/* Apply for a job */

router.post(
    "/apply",
    applyForJob
);


export default router;