import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../schema/userSchema.js';
import { TPromptCreatorProps } from '../../types/index.js';

export function generateRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

export const generateToken = async (userDetail: any) => {
    console.log(userDetail)
    const user = await User.findOne({ email: userDetail.email })
    console.log("Token generation user:", user)
    const token = jwt.sign({ sub: user?.id, payload: user }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "1h" /*60*/ });
    return token;
};

export const verifyPassword = async (enteredPassword: string, storedPassword: string) => {
    const isMatch = await bcrypt.compare(enteredPassword, storedPassword);
    return isMatch;
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
        req.body.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

export function promptCreator({ fieldOfInterest, chosenProfession, knowledgeLevel, questionCount }: TPromptCreatorProps) {
    return `Please provide ${questionCount || 'an appropriate number of'} interview questions for someone in the field of interest "${fieldOfInterest}", choosing the profession "${chosenProfession}" with a knowledge level of "${knowledgeLevel}". we don't need any other bonus questions and give me into numberwise question like serial number wise.`;;
}