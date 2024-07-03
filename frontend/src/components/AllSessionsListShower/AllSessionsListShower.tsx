import React from 'react'
import { TInterviewSession } from '../../types/InterviewSessionTypes'
import { Box, IconButton, List, ListItem, Stack, Tooltip, Typography } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link } from 'react-router-dom';

const AllSessionsListShower = ({ interviewSessions }: any) => {
    return (
        <Box sx={{ my: 3 }}>
            <Typography
                variant='h5'
                mb={2}
            >
                All Interview Sessions
            </Typography>
            <Stack spacing={2}>
                {
                    interviewSessions ?
                        interviewSessions.map((item: any) => (
                            <ListItem
                                key={item._id}
                                sx={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: "primary.dark",
                                    borderRadius: 3
                                }}
                            >
                                <Typography variant='h6'>
                                    {
                                        item.title ?
                                            item.title
                                            :
                                            `${item.fieldOfInterest} based interview session`
                                    }
                                </Typography>
                                <Typography>
                                    {item.chosenProfession}
                                </Typography>
                                <Tooltip title="Start Interview Sesssion" followCursor>
                                    <Link to={`/start-interview/${item._id}`}>
                                        <IconButton
                                            sx={{ color: '#fff' }}
                                        >
                                            <PlayCircleOutlineIcon />
                                        </IconButton>
                                    </Link>
                                </Tooltip>
                            </ListItem>
                        ))
                        :
                        null
                }
            </Stack>
        </Box>
    )
}

export { AllSessionsListShower }
