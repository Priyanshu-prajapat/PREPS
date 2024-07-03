import { Box, Container, CssBaseline, Typography } from "@mui/material"
import { TAuthUser, TSigninCredentails } from "../types/AuthUserTypes";
import { useSigninUser } from "../hooks/AuthHooks";
import { useNavigate } from "react-router-dom";
import { SigninForm } from "../components/SigninForm";
import { useAuth } from "../Providers/AuthProvider/AuthContext";

const SigninPage = () => {
    const mutation = useSigninUser();
    const nevigate = useNavigate();
    const { setAuthUser } = useAuth();

    const onSubmit = (data: TSigninCredentails) => {
        mutation.mutate(data, {
            onSuccess: (data) => {
                console.log("From signin:", data)
                if (data.token) {
                    setAuthUser(data.user)
                }
                nevigate('/dashboard')
            },
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8 }}>
                <Typography
                    variant="h4"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: "15px",
                        color: "#fff"
                    }}
                >
                    Login Form
                </Typography>
                <SigninForm onFormSubmit={onSubmit} formMutation={mutation} />
            </Box>
        </Container>
    )
}

export default SigninPage
