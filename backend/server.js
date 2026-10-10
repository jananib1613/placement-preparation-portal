import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import db from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import aptitudeRoutes from "./routes/aptitudeRoutes.js";
import codingRoutes from "./routes/codingRoutes.js";
import compilerRoutes from "./routes/compilerRoutes.js";
import codingTheoryRoutes from "./routes/codingTheoryRoutes.js";
import theoryRoutes from "./routes/theoryRoutes.js";
import aptitudeMockRoutes from "./routes/aptitudeMockRoutes.js";
import mockTestRoutes from "./routes/mockTestRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import companyAttemptRoutes from "./routes/companyAttemptRoutes.js";
import companyInterviewRoutes from "./routes/companyInterviewRoutes.js";
import companyCodingRoutes from "./routes/companyCodingRoutes.js";
import companyAptitudeRoutes from "./routes/companyAptitudeRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import hrRoutes from "./routes/hrRoutes.js";
import technicalRoutes from "./routes/technicalRoutes.js";
import technicalHistoryRoutes from "./routes/technicalHistoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import placementRoutes from "./routes/placementRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import placementJourneyRoutes from "./routes/placementJourneyRoutes.js";
import aiRecruiterRoutes from "./routes/aiRecruiterRoutes.js";
import aiEvaluationRoutes from "./routes/aiEvaluationRoutes.js";
import aiHistoryRoutes from "./routes/aiHistoryRoutes.js";
import placementHistoryRoutes from "./routes/placementHistoryRoutes.js";
const app = express();



app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
);


app.use(express.json());


app.use(
"/api/coding/theory",
codingTheoryRoutes
);

app.use(
    "/api/theory",
    theoryRoutes
);

app.use(
    "/api/mock",
    aptitudeMockRoutes
);

app.use("/api/mocktest", mockTestRoutes);
app.use(
"/api/company",
companyAttemptRoutes
);

app.use("/api/auth", authRoutes);

// Home Route

app.get("/",(req,res)=>{

    res.send(
        "Placement Preparation Portal Backend Running..."
    );

});





// Database Test

app.get("/api/test",(req,res)=>{


    db.query(
        "SELECT NOW() AS currentTime",

        (err,result)=>{


            if(err){

                return res.status(500).json({
                    error:err.message
                });

            }


            res.json(result);


        }

    );


});






// API Routes


app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/jobs",
    jobRoutes
);


app.use(
    "/api/dashboard",
    dashboardRoutes
);

app.use(
"/api/placement",
placementRoutes
);

app.use(
"/api/activity",
activityRoutes
);

app.use("/api/leaderboard",leaderboardRoutes);

app.use("/api/achievements", achievementRoutes);

app.use("/api/hr", hrRoutes);

app.use("/api/technical", technicalRoutes);

app.use("/api/technical", technicalHistoryRoutes);

app.use("/api/placement", placementJourneyRoutes);

app.use("/api/ai-recruiter",aiRecruiterRoutes);

app.use(
"/api/placement",
placementHistoryRoutes
);

app.use(
"/api/ai-recruiter",
aiHistoryRoutes
);

app.use(
"/api/ai-recruiter",
aiEvaluationRoutes
);

app.use("/api/users", userRoutes);


// Aptitude Routes

app.use(
    "/api/aptitude",
    aptitudeRoutes
);


app.use(
"/api/coding",
codingRoutes
);

app.use(
    "/api/compiler",
    compilerRoutes
);
app.use(
"/api/company/interview",
companyInterviewRoutes
);

app.use(
"/api/company/coding",
companyCodingRoutes
);

app.use(
"/api/company/aptitude",
companyAptitudeRoutes
);

app.use("/api/company", companyRoutes);


const PORT = process.env.PORT || 5000;



app.listen(PORT,()=>{


console.log(
`🚀 Server Running on Port ${PORT}`
);


});