import axios from "axios";
import { getCookie } from "./cookiesOperations";


export const customAxios = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000"
})

axios.interceptors.request.use(function (config) {
    const authUser = getCookie("accessToken");
    console.log(authUser)
    if (authUser) {
        const authUserData = JSON.parse(authUser);
        config.headers["Authorization"] = "Bearer " + authUserData.accessToken;
    }

    return config;
});