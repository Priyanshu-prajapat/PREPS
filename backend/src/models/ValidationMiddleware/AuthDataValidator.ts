import { NextFunction, Request, Response } from "express";
import { signinRequestSchema, signupRequestSchema } from "../index.js";
import { z } from "zod";

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
    try {
        signupRequestSchema.parse(req.body);
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

export const validateSignin = (req: Request, res: Response, next: NextFunction) => {
    try {
        signinRequestSchema.parse(req.body);
        next();
    } catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(404).send({
                message: "Validation failed.",
                errors: e.errors,
            })
        }
        next(e);
    }
}