export type TQuestion = {
    id: string,
    question: string,
}

export type TCreateInterviewSession = {
    fieldOfInterest: string,
    chosenProfession: string,
    knowledgeLevel: string,
    questionCount: number
}

export type TInterviewSession = {
    _id: string,
    __v: number,
    fieldOfInterest: string,
    chosenProfession: string,
    knowledgeLevel: string,
    questionCount: string,
    authorPrompt: string,
    author: any,
    questions: string[],
}

export type InterviewSessionStateType = {
    totalInterviewSession: number,
    interviewSessions: TInterviewSession[]
}

export type InterviewQuestionRequestType = {
    index?: number,
    id?: string | undefined,
}