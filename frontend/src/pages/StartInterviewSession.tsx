import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { InterviewSessionPlayer } from "../components/InterviewSessionPlayer"
import { Box, Button, Stack, Typography } from "@mui/material"
import { getEachInterviewQuestion } from "../services/interviewSessionService"
import InterviewSessionPlayerStarterPage from "../components/InterviewSessionPlayer/InterviewSessionPlayerStarterPage"

const StartInterviewSessionPage = () => {
    const [currentQuestion, setCurrentQuestion] = React.useState<string>('');
    const [questionIndex, setQuestionIndex] = React.useState<number>(0);
    const [isStart, setIsStart] = React.useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const handleStartInterview = async (totalQuestions?: number) => {
        console.log("totals", totalQuestions, "indexq", questionIndex);
        if (totalQuestions == questionIndex) {
            // here we need to create a dialog box.
            alert("interview session is completed.")
            navigate('/dashboard')
        }
        setIsStart(true)
        const data = await getEachInterviewQuestion({ id: params.id, index: questionIndex })
        if (data.question) {
            const value = new SpeechSynthesisUtterance(data.question);
            window.speechSynthesis.speak(value);
        }
        setCurrentQuestion(data?.question);
        setQuestionIndex(data.nextIndex);
    }

    const handleCloseInterview = () => {
        setIsStart(false)
        navigate("/dashboard")
    }
    return (
        <>
            {
                isStart ?
                    <InterviewSessionPlayer
                        question={currentQuestion ? currentQuestion : ""}
                        onClickStartSession={handleCloseInterview}
                        onNext={handleStartInterview}
                    />
                    :
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            marginTop: "20px"
                        }}
                    >
                        <InterviewSessionPlayerStarterPage onNext={handleStartInterview} />
                    </Box>
            }
        </>
    )
}

export default StartInterviewSessionPage
