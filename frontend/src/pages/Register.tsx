import { useSignupUser } from "../hooks/AuthHooks";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { TSignupCredentials } from "../types/AuthUserTypes";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import { useAuth } from "../Providers/AuthProvider/AuthContext";

const RegisterationPage = () => {
    const nevigate = useNavigate();
    const mutation = useSignupUser();
    const { setAuthUser, authUser } = useAuth();

    const onSubmit = (data: TSignupCredentials) => {
        mutation.mutate(data, {
            onSuccess: (data) => {
                // console.log("on Register:", data)
                if (data.user) {
                    setAuthUser(data.user)
                }
                nevigate("/")
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }
    // console.log(mutation.data)
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
                    Register Form
                </Typography>
                <RegisterForm onFormSubmit={onSubmit} mutation={mutation} />
            </Box>
        </Container>
    )
}

export default RegisterationPage
