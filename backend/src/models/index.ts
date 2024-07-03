import { z } from "zod";


export const signupRequestSchema = z.object({
    firstName:
        z.string({
            required_error: "firstName is required",
            invalid_type_error: "firstName must be a string",
        })
            .min(1, "First name is required"),
    lastName:
        z.string({
            required_error: "lastName is required",
            invalid_type_error: "lastName must be a string",
        })
            .min(1, "First name is required"),
    email:
        z.string()
            .email({
                message: 'Invalid email address.'
            }),
    password:
        z.string()
            .min(8, { message: "password must be 8 or more characters longer" })
});

export const signinRequestSchema = z.object({
    email:
        z.string()
            .email({
                message: "Invalid email address."
            }),
    password:
        z.string()
            .min(8, { message: "password must be 8 or more characters longer." })
})