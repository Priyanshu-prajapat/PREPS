import { InterviewQuestionRequestType, TCreateInterviewSession } from "../types/InterviewSessionTypes";
import { customAxios as axios } from "../utilities/modifiedAxios";


export async function createInterviewSession(credentials: TCreateInterviewSession) {
    try {
        const { data } = await axios.post("/interview/create-interview-session", credentials)
        return data;
    } catch (error: any) {
        throw new Error("Somthing wrong while creating new interview session.", error.message)
    }
}

export async function getAllInterviewSessions() {
    try {
        const { data } = await axios.get("/interview/all-interview-sessions");
        return data;
    } catch (error: any) {
        throw new Error("Something wrong while getting interivew sessions.", error)
    }
}

export async function getTotalInterviews() {
    try {
        const { data } = await axios.get("/interview/total-interview-sessions");
        return data;
    } catch (error: any) {
        throw new Error("Something wrong while getting Total number of sessions.", error)
    }
}

export async function getEachInterviewSession() {
    try {
        const { data } = await axios.get("/interview/interview-sessions");
        return data;
    } catch (error: any) {
        throw new Error("Something wrong while getting Total number of sessions.", error)
    }
}

export async function getInterviewQuestions(credentials: any) {
    try {
        const { data } = await axios.post("/interview/start-interview-session", credentials)
        return data;
    } catch (error: any) {
        throw new Error("Something went wrong while getting interview questions.", error)
    }
}

export async function getEachInterviewQuestion(credentials: InterviewQuestionRequestType): Promise<{ question: string, nextIndex: number, total: number }> {
    console.log(credentials)
    try {
        const { data } = await axios.get(`/interview/interview-question/${credentials.id}`, {
            params: { index: credentials.index }
        });
        return data;
    } catch (error: any) {
        throw new Error("Something went wrong while getting interview question.", error.message)
    }
}

type totalQuestionsType = { id?: string }
export async function getTotalInterviewQuestions(credentials: totalQuestionsType) {
    try {
        console.log("credentials", credentials)
        const { data } = await axios.get(`/interview/total-interview-questions/${credentials.id}`);
        return data;
    } catch (error: any) {
        throw new Error("Something went wrong while getting interview question.", error.message)
    }
}