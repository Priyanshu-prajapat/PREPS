import { Button, Stack, TextField, Typography } from '@mui/material'
import { TAuthUser, TError, TSignupCredentials } from '../../types/AuthUserTypes'
import { UseMutationResult } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

type RegisterFormProps = {
    onFormSubmit: (data: TSignupCredentials) => void,
    mutation: UseMutationResult<TAuthUser, TError, TSignupCredentials, unknown>,
}

const RegisterForm = ({ onFormSubmit, mutation }: RegisterFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    });

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Stack spacing={1}>
                <TextField
                    autoFocus
                    placeholder="enter your firstname"
                    {
                    ...register("firstName", { required: "First Name is required." })
                    }
                    error={errors.firstName || mutation.isError ? true : false}
                    helperText={errors.firstName && errors.firstName.message}
                />
                <TextField
                    placeholder="enter your lastname"
                    {
                    ...register("lastName", { required: "Last Name is required." })
                    }
                    error={errors.lastName || mutation.isError ? true : false}
                    helperText={errors.lastName && errors.lastName.message}
                />
                <TextField
                    placeholder="enter your email"
                    type="email"
                    {
                    ...register("email", { required: "Email is required." })
                    }
                    error={errors.email || mutation.isError ? true : false}
                    helperText={errors.email && errors.email.message}
                />
                <TextField
                    placeholder="enter your password"
                    type="password"
                    {
                    ...register("password", { required: "Password is required.", min: 8 })
                    }
                    error={errors.password || mutation.isError ? true : false}
                    helperText={errors.password && errors.password.message}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={mutation.isPending}
                >
                    {
                        mutation.isPending ? "Loading..." : "Sign Up"
                    }
                </Button>
                <Typography color={"red"}>
                    {
                        mutation.isError && mutation.error.message
                    }
                </Typography>
            </Stack>
        </form>
    )
}

export { RegisterForm }
