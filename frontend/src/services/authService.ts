import { TSigninCredentails, TSignupCredentials } from "../types/AuthUserTypes";
import { customAxios as axios } from "../utilities/modifiedAxios";


export async function signupUser(credentials: TSignupCredentials) {
    try {
        const { data } = await axios.post("/auth/signup", credentials);
        return data;
    } catch (error: any) {
        // console.error("Something wrong in server.", error.message)
        throw new Error(`Something wrong in server., ${error.message}`)
    }
}

export async function signinUser(credentials: TSigninCredentails) {
    try {
        const { data } = await axios.post("/auth/signin", credentials)
        return data;
    } catch (error: any) {
        // console.error("Something wrong in server.", error.response.data.error)
        throw new Error(`${error.response.data.error}`)
    }
}

export async function getUser() {
    try {
        const { data } = await axios.get("/account/profile");
        return data;
    } catch (error: any) {
        throw new Error(`${error.message}`)
    }
}