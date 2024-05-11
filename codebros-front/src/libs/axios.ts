import axios from "axios";
import { useAuthStore } from "../store/auth";

// Obtener la URL de la API desde el archivo .env
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const authApi = axios.create({
    baseURL,
    withCredentials: false,
});

authApi.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    config.headers = {
        Authorization: `Bearer ${token}`,
    };
    return config;
});
