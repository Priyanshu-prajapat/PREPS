import { NextFunction, Request, Response, Router } from "express";
import { promptCreator } from "../services/helperServices/helperServices.js";
import { generateQuestions } from "../services/helperServices/PromptGeneratorAI/index.js";
import { InterviewSession } from "../schema/interviewSessionSchema.js";

export async function createInterviewSession(req: Request, res: Response, next: NextFunction) {
    // console.log("auth User", req.body.verifiedUser)
    const { fieldOfInterest, chosenProfession, knowledgeLevel, questionCount } = req.body;
    const newInterviewSession = await new InterviewSession({
        title: `${fieldOfInterest} based interview session`,
        fieldOfInterest,
        chosenProfession,
        knowledgeLevel,
        questionCount,
        author: req.body.verifiedUser
    })
    await newInterviewSession.save();
    const prompt = promptCreator({ fieldOfInterest, chosenProfession, knowledgeLevel, questionCount })
    const data = await generateQuestions(prompt);
    newInterviewSession.authorPrompt = prompt;
    newInterviewSession.questions = data ? data : [];
    await newInterviewSession.save();
    res.send({ message: "Questions are successfully created." })
}

export async function getAllInterviewSessions(req: Request, res: Response, next: NextFunction) {
    try {
        const interviewSessions = await InterviewSession.find();
        res.status(200).send({
            message: "data is successfully comming",
            interviewSessions
        })
    } catch (error) {
        console.error("having issue while getting interview sessions from the database", error);
        return res.status(500).send({ message: "having issue while getting interview sessions from the database" })
    }
}

export async function getTotalInterviewSession(req: Request, res: Response, next: NextFunction) {
    try {
        const interviewSessionCount = await InterviewSession.countDocuments();
        // console.log(`Total interview sessions: ${interviewSessionCount}`);
        res.status(200).send({
            interviewSessionCount
        })
    } catch (error: any) {
        console.error("having issue while getting interview sessions from the database", error.message);
        return res.status(500).send({ message: error.message })
    }
}
export async function getEachinterviewSession(req: Request, res: Response, next: NextFunction) {
    try {
        const interviewSessions = await InterviewSession.find({}, { questions: 0, knowledgeLevel: 0 });
        // console.log(interviewSessions)
        res.status(200).send({
            interviewSessions
        })
    } catch (error: any) {
        console.error("having issue while getting interview sessions from the collection", error.message);
        res.status(500).json({ message: "server error" });
    }
}

export async function getTotalInterviewQuestions(req: Request, res: Response, next: NextFunction) {
    try {
        const interviewSession = await InterviewSession.findById(req.params.id, { questionCount: 1, _id: 0 });
        if (!interviewSession) {
            return res.status(404).send({ message: "Interview questions not found" });
        }
        res.status(200).send({
            totalInterviewQuestions: interviewSession.questionCount
        })
    } catch (error: any) {
        res.status(500).send("there is something issue while getting number of interview questions.")
    }
    // res.send("request is comming.")
}
export async function getEachInterviewQuestion(req: Request, res: Response, next: NextFunction) {
    const interviewSessionId = req.params.index;
    const questionIndex = parseInt(req.query.index) || 0; // Default to 0 if no index is provided

    try {
        const interviewSession = await InterviewSession.findById(interviewSessionId, { questions: 1, _id: 0 });
        // console.log(interviewSession)

        if (!interviewSession || !interviewSession.questions) {
            return res.status(404).send({ message: "No questions found for this session" });
        }

        if (interviewSession.questions.length === 0) {
            return res.status(404).send({ message: "No questions found for this session" });
        }

        if (questionIndex < 0) {
            return res.status(400).send({ message: "Invalid question index" });
        }
        if (questionIndex >= interviewSession.questions.length) {
            return res.status(200).send({ message: "Interview questions are completed." });
        }

        const question = interviewSession.questions[questionIndex];
        res.send({ question, nextIndex: questionIndex + 1 });

    } catch (error) {
        console.error("Error fetching interview session:", error);
        res.status(500).send({ message: "Internal server error" });
    }
} 