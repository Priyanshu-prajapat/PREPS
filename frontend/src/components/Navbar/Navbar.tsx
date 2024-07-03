import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Providers/AuthProvider/AuthContext'

const Navbar = () => {
    const { authUser } = useAuth();
    // console.log("auth user at navbar", authUser)
    return (
        <Box
            sx={{
                backgroundColor: "primary.main",
                padding: '20px 20px',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <Typography variant='h5'>
                Hello Users This is my App
            </Typography>
            <Stack direction={'row'} spacing={2}>
                {
                    authUser === null ?
                        <>
                            <Button variant='contained'>
                                <Link to={"/auth/signin"} style={{ textDecoration: 'none' }}>
                                    login in
                                </Link>
                            </Button>
                            <Button variant='outlined'>
                                <Link to={"/auth/signup"} style={{ textDecoration: 'none' }}>
                                    sign up
                                </Link>
                            </Button>
                        </>
                        :
                        <Avatar src='3' alt='User' />
                }
            </Stack>
        </Box>
    )
}

export { Navbar }
