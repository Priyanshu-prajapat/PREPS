import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { getTotalInterviewQuestions } from '../../services/interviewSessionService'
import { useParams } from 'react-router-dom'

type InterviewSessionPlayerProps = {
    question: string,
    onClickStartSession: () => void,
    onNext: (total?: number) => void
}

const InterviewSessionPlayer = ({ question, onClickStartSession, onNext }: InterviewSessionPlayerProps) => {
    const [totalQuestions, setTotalQuestions] = React.useState(-1);
    const params = useParams();
    React.useEffect(() => {
        (async () => {
            const data = await getTotalInterviewQuestions({ id: params.id });
            setTotalQuestions(data.totalInterviewQuestions)
        })()
    }, [])
    return (
        <Stack
            sx={{
                color: "#fff",
            }}
        >
            <Typography
                sx={{
                    color: "#fff",
                    margin: "10px 20px",
                }}
                variant="h5"
            >
                Total Questions: {totalQuestions}
            </Typography>
            <Box
                sx={{
                    margin: "20px",
                    padding: "20px",
                    display: 'flex',
                    height: "70vh",
                    minWidth: "80%",
                    borderRadius: "20px",
                    backgroundColor: "primary.main",
                }}
            >
                {/* <Box sx={{ minWidth: "50%", backgroundColor: 'black' }}>
                    <Typography>Video</Typography>
                </Box> */}
                <Box
                    sx={{
                        minWidth: "50%",
                        padding: "20px"
                    }}
                >
                    <Typography variant='h4'>
                        {question}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-evenly" }}>
                <Button variant="contained" onClick={onClickStartSession}>
                    cancel interview
                </Button>
                <Button variant="contained" onClick={() => onNext(totalQuestions)}>
                    Next Question
                </Button>
            </Box>
        </Stack>
    )
}

export { InterviewSessionPlayer }
