import { z } from "zod";


export const interviewSessionCreationRequestSchema = z.object({
    fieldOfInterest: z.string({
        required_error: "Field of Interest is required.",
        invalid_type_error: "Field of Interest must be a string"
    })
        .min(5, "FieldOfInterest is required.").trim(),
    chosenProfession: z.string({
        required_error: "Chosen Profession is required.",
        invalid_type_error: "ChosenProfesion must be string",
    })
        .min(5, "ChosenProfession is required.").trim(),
    knowledgeLevel: z.enum(['beginner', 'intermediate', 'advance']),
    questionCount: z.string().default("10").optional(),
})