import { Box, Typography } from '@mui/material'
import { InterviewSessionCreator } from '../components/InterviewSessionCreator'
import { useInterviewSessionCreator } from '../hooks/InterviewSessionHooks'

const CreateInterviewSessionPage = () => {
    const mutation = useInterviewSessionCreator();
    return (
        <Box>
            <Typography variant='h4' sx={{ mb: 3 }}>
                Create Interview Session
            </Typography>
            <InterviewSessionCreator mutation={mutation} />
        </Box>
    )
}

export default CreateInterviewSessionPage
