import { useMutation, useQuery } from "@tanstack/react-query"
import { getUser, signinUser, signupUser } from "../services/authService"

export const useSignupUser = () => {
    return useMutation({
        mutationKey: ["signup"],
        mutationFn: signupUser
    })
}

export const useSigninUser = () => {
    return useMutation({
        mutationKey: ["signin"],
        mutationFn: signinUser
    })
}
