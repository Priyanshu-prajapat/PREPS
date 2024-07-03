import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { interviewSessionCreationRequestSchema } from "../ZodSchemas/InterviewSessionSchema.js";


export const validateInterviewSessionCreation = (req: Request, res: Response, next: NextFunction) => {
    try {
        interviewSessionCreationRequestSchema.parse(req.body);
        next();
    } catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).send({
                message: "Validation failed",
                errors: e.errors,
            });
        }
        next(e);
    }
};