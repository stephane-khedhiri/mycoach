import axios from "axios";

export const Api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials:false
})