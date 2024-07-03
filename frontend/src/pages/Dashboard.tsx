import { Box, Typography } from '@mui/material'
import TotalShower from '../components/Widgets/TotalShower'
import { AllSessionsListShower } from '../components/AllSessionsListShower'
import { useGetInterviewSessions } from '../hooks/InterviewSessionHooks'

const DashboardPage = () => {
    const data = useGetInterviewSessions()
    const [totalInterviewSessions, eachInterviewSession] = data;
    return (
        <Box>
            {
                totalInterviewSessions.data && eachInterviewSession.data ?
                    <>
                        <TotalShower amount={totalInterviewSessions?.data.interviewSessionCount} />
                        <AllSessionsListShower interviewSessions={eachInterviewSession?.data.interviewSessions} />
                    </>
                    :
                    <Typography variant='h3' color="gray"> No Interview Sessions </Typography>
            }
        </Box>
    )
}

export default DashboardPage
