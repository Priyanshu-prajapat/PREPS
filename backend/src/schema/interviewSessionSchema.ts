import mongoose from "mongoose";
import { User } from './userSchema.js';


const Schema = mongoose.Schema;

const interviewSessionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    fieldOfInterest: {
        type: String,
        required: true
    },
    chosenProfession: {
        type: String,
        required: true,
    },
    knowledgeLevel: {
        type: String,
        enum: ["beginner", "intermediate", "advance"],
        default: "beginner",
    },
    questionCount: {
        type: String,
        required: true
    },
    authorPrompt: {
        type: String,
        select: false,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questions: [
        {
            type: String,
        }
    ],
});

const InterviewSession = mongoose.model('interview-sessions', interviewSessionSchema);

export { InterviewSession };