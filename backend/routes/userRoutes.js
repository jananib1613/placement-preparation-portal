import express from "express";

import {

    getProfile,

    updateProfile,

    changePassword

} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:id", getProfile);

router.put("/profile/:id", updateProfile);

router.put("/change-password",changePassword);

export default router;