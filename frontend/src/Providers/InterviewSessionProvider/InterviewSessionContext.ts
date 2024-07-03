import React from "react";
import { InterviewSessionStateType, TInterviewSession } from "../../types/InterviewSessionTypes";

type InterviewSessionsContextType = {
    interviews: InterviewSessionStateType;
    handleInterviewSessions: (sessions: TInterviewSession[]) => void;
}

let initialValue = {
    interviews: {
        totalInterviewSession: -1,
        interviewSessions: [],
    },
    handleInterviewSessions: (sessions: TInterviewSession[]) => { }
}

export const InterviewSessionContext = React.createContext<InterviewSessionsContextType>(initialValue);

export const useInterviewSession = () => {
    return React.useContext(InterviewSessionContext)
}