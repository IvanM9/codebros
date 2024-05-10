import axios from "axios";
import { useAuthStore } from "../store/auth";

export const authApi = axios.create({
    baseURL: "https://codebros.onrender.com/api",
    withCredentials: true,
});

authApi.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    config.headers = {
        Authorization: `Bearer ${token}`,
    };
    return config;
});

