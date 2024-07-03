import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'

const InterviewSessionPlayerStarterPage = ({ onNext }: { onNext: () => void }) => {
    return (
        <Stack
            sx={{
                textAlign: 'center',
                gap: 4
            }}
        >
            <Typography
                sx={{
                    color: "#fff",
                }}
                variant="h3"
            >
                Start Your Interview Session
            </Typography>
            <Box>
                <Button
                    variant="contained"
                    onClick={() => onNext()}
                >
                    Start your Interview
                </Button>
            </Box>
        </Stack>
    )
}

export default InterviewSessionPlayerStarterPage
