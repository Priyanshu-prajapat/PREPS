import { Box, Typography } from '@mui/material';
import { useLocation, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error: any = useRouteError();
    const location = useLocation();
    const message = location.state?.message || "An Error occurred"
    console.error(error)
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center"
        }}>
            <div>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <Box>
                    <Typography>{error.statusText || error.message}</Typography>
                    <Typography>{message ? message : null}</Typography>
                </Box>
            </div>
        </Box>
    )
}

export default ErrorPage
