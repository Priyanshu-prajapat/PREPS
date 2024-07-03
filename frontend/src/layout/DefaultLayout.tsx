
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar/SideBar'
import { Navbar } from '../components/Navbar'
import React from 'react'

const DefaultLayout = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    height: '100vh',
                    backgroundColor: 'primary.light',
                    color: '#fff'
                }}
            >
                <SideBar />
                <Box
                    sx={{
                        p: 2,
                        width: "80%",
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </React.Fragment>

    )
}

export default DefaultLayout
