import { useMutation, useQueries, useQuery } from "@tanstack/react-query"
import { createInterviewSession, getEachInterviewQuestion, getEachInterviewSession, getInterviewQuestions, getTotalInterviews } from "../services/interviewSessionService"
import { InterviewQuestionRequestType } from "../types/InterviewSessionTypes"

export const useInterviewSessionCreator = () => {
    return useMutation({
        mutationKey: ["signup"],
        mutationFn: createInterviewSession
    })
}

export const useGetInterviewSessions = () => {
    return useQueries({
        queries: [
            {
                queryKey: ["totalInterviews"],
                queryFn: getTotalInterviews,
            },
            {
                queryKey: ["eachInterviewDetail"],
                queryFn: getEachInterviewSession,
            }
        ]
    })
}

// it fired infinitelly.
export const useInterviewQuestion = (credentials: InterviewQuestionRequestType) => {
    return useQuery({
        queryKey: ["interview-question"],
        queryFn: () => getEachInterviewQuestion(credentials),
    })
}