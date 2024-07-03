import { Button, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { TAuthUser, TError, TSigninCredentails } from '../../types/AuthUserTypes';
import { UseMutationResult } from '@tanstack/react-query';

type SigninFormProps = {
    onFormSubmit: (data: TSigninCredentails) => void,
    formMutation: UseMutationResult<TAuthUser, TError, TSigninCredentails, unknown>,
}

const SigninForm = ({ onFormSubmit, formMutation }: SigninFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });
    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Stack spacing={1}>
                <TextField
                    autoFocus
                    placeholder="enter your email"
                    type="email"
                    {...register('email', { required: "Email is required." })}
                    error={errors.email || formMutation.isError ? true : false}
                    helperText={errors.email && errors.email?.message}
                />
                <TextField
                    placeholder="enter your password"
                    type="password"
                    {...register("password", { required: "Password is required." })}
                    error={errors.password || formMutation.isError ? true : false}
                    helperText={errors.password && errors.password?.message}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={formMutation.isPending}
                >
                    {
                        formMutation.isPending ? "Loading..." : "Log In"
                    }
                </Button>
                <Typography color={"red"}>
                    {
                        formMutation.isError && formMutation.error.message
                    }
                </Typography>
            </Stack>
        </form>
    )
}

export { SigninForm }
