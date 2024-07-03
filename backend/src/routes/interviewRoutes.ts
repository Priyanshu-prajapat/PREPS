import { Router } from "express";
import { validateInterviewSessionCreation } from "../models/ValidationMiddleware/InterviewSessionDataValidator.js";
import {
    createInterviewSession,
    getAllInterviewSessions,
    getEachInterviewQuestion,
    getEachinterviewSession,
    getTotalInterviewQuestions,
    getTotalInterviewSession
} from "../services/interviewSessionService.js";

const router = Router()

router.get("/all-interview-sessions", getAllInterviewSessions)
router.get("/total-interview-sessions", getTotalInterviewSession)
router.get("/interview-sessions", getEachinterviewSession)
router.post("/create-interview-session", validateInterviewSessionCreation, createInterviewSession);
router.get("/interview-question/:index", getEachInterviewQuestion)
router.get("/total-interview-questions/:id", getTotalInterviewQuestions)


export default router