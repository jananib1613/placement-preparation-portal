import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Aptitude from "./pages/Aptitude";
import Coding from "./pages/Coding";
import CodeEditor from "./pages/CodeEditor";
import MockTest from "./pages/MockTest";
import Analytics from "./pages/Analytics";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import AptitudeTest from "./pages/AptitudeTest";
import AptitudeResult from "./pages/AptitudeResult";
import AptitudeHistory from "./pages/AptitudeHistory";
import CodingQuestions from "./pages/CodingQuestions";
import CodingHistory from "./pages/CodingHistory";
import CodingTheory from "./pages/CodingTheory";
import AptitudeMockTest from "./pages/AptitudeMockTest";
import MockTestResult from "./pages/MockTestResult";
import MockTestHistory from "./pages/MockTestHistory";
import CompanyTest from "./pages/CompanyTest";
import CompanyHistory from "./pages/CompanyHistory";
import CompanyPreparation from "./pages/CompanyPreparation";
import CompanyDetails from "./pages/CompanyDetails";
import TechnicalInterview from "./pages/TechnicalInterview";
import HRInterview from "./pages/HRInterview";
import CompanyCoding from "./pages/CompanyCoding";
import CompanyAptitude from "./pages/CompanyAptitude";
import CodingProblem from "./pages/CodingProblem";
import HRTest from "./pages/HRTest";
import HRTestHistory from "./pages/HRTestHistory";
import TechnicalTopics from "./pages/TechnicalTopics";
import TechnicalResult from "./pages/TechnicalResult";
import TechnicalTest from "./pages/TechnicalTest";
import TechnicalHistory from "./pages/TechnicalHistory";
import PlacementCompanies from "./pages/PlacementCompanies";
import PlacementJourney from "./pages/PlacementJourney";
import CompanyAssessment from "./pages/CompanyAssessment";
import AIRecruiter from "./pages/AIRecruiter";
import AIResult from "./pages/AIResult";
import AIInterviewHistory from "./pages/AIInterviewHistory";
import PlacementHistory from "./pages/PlacementHistory";
import CodingMockTest from "./pages/CodingMockTest";
import CodingMockTestResult from "./pages/CodingMockTestResult";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/aptitude" element={<Aptitude />} />
      <Route path="/coding" element={<Coding />} />
      <Route path="/compiler" element={<CodeEditor />} />
      <Route path="/mock-test" element={<MockTest />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/aptitude-test/:topicId" element={<AptitudeTest />}/>
      <Route path="/aptitude-result" element={<AptitudeResult />}/> 
      <Route path="/aptitude-history" element={<AptitudeHistory/>}/>
      <Route path="/coding/:topic" element={<CodingQuestions/>}/>
      <Route path="/coding-history" element={<CodingHistory />}/>
      <Route path="/coding/theory/:topic" element={<CodingTheory />}/>
      <Route path="/mocktest/aptitude" element={<AptitudeMockTest />} />
      <Route path="/mocktest-result" element={<MockTestResult />}/>
      <Route path="/mocktest-history" element={<MockTestHistory />}/>
      <Route path="/company-test/:company" element={<CompanyTest />}/>
      <Route path="/company-history" element={<CompanyHistory/>}/>
      <Route path="/company-preparation" element={<CompanyPreparation/>}/>
      <Route path="/company/:company" element={<CompanyDetails/>}/>
      <Route path="/company/:company/technical-interview" element={<TechnicalInterview/>}/>
      <Route path="/company/:company/hr-interview" element={<HRInterview/>}/>
      <Route path="/company/:company/coding" element={<CompanyCoding/>}/>
      <Route path="/company/:company/aptitude" element={<CompanyAptitude/>}/>
      <Route path="/coding/problem/:id" element={<CodingProblem/>}/>
      <Route path="/coding-editor" element={<CodeEditor/>}/>
      <Route path="/mocktest/hr" element={<HRTest />} />
      <Route path="/hr-history" element={<HRTestHistory />}/>
      <Route path="/technical-topics" element={<TechnicalTopics />} />
      <Route path="/technical-result" element={<TechnicalResult />}/>
      <Route path="/technical-test/:topicId" element={<TechnicalTest />}/>
      <Route path="/technical-history" element={<TechnicalHistory />}/>
      <Route path="/placement-companies" element={<PlacementCompanies/>}/>
      <Route path="/placement/company/:companyId" element={<PlacementJourney/>}/>
      <Route path="/company-assessment/:companyName"  element={<CompanyAssessment />} />
      <Route path="/ai-recruiter" element={<AIRecruiter/>}/>
      <Route path="/ai-result" element={<AIResult/>}/>
      <Route path="/ai-history" element={<AIInterviewHistory/>}/>
      <Route path="/placement-history" element={<PlacementHistory/>}/>
      <Route path="/mocktest/coding" element={<CodingMockTest />}/>
      <Route path="/mocktest/coding-result" element={<CodingMockTestResult/>}/>
      <Route path="/register" element={<Register />} />
      
     
      
    </Routes>
  );
}

export default App;