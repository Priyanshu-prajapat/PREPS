import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

const AuthLayout = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                backgroundColor: "#292929",
            }}
        >
            <Navbar />
            <Outlet />
        </Box>
    )
}

export default AuthLayout
