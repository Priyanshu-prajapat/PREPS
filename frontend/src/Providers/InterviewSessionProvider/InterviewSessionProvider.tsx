import React from 'react'
import { InterviewSessionContext } from './InterviewSessionContext'
import { InterviewSessionStateType, TInterviewSession } from '../../types/InterviewSessionTypes';

const InterviewSessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setInterviewSessionsState] = React.useState<InterviewSessionStateType>({
        totalInterviewSession: -1,
        interviewSessions: [],
    });

    const handleInterviewSessions = (sessions: TInterviewSession[]) => {
        setInterviewSessionsState({ interviewSessions: sessions, totalInterviewSession: sessions.length })
    }

    const providerValue = {
        interviews: state,
        handleInterviewSessions
    }

    return (
        <InterviewSessionContext.Provider value={providerValue}>
            {children}
        </InterviewSessionContext.Provider>
    )
}

export default InterviewSessionProvider
