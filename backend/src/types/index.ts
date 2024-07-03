import { Document } from "mongoose";
import { Types } from "mongoose";

export type TUser = Document<unknown, {}, {
    firstName: string;
    lastName: string;
    email: string;
    lastLoginDate: Date;
    roles: "Member" | "Admin";
    isVerified: boolean;
    tokens: Types.DocumentArray<{
        auth_token: string;
    }>;
    verificationCode?: string | undefined;
}>

export type TPromptCreatorProps = {
    fieldOfInterest: string,
    chosenProfession: string,
    knowledgeLevel: string,
    questionCount: string
}