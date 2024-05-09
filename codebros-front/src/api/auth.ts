import axios from "axios";
import type { LoginUser, DraftDeveloper } from '../types'


export const loginRequest = async (data: LoginUser) => {
    try {
        return await axios({ url: 'https://codebros.onrender.com/api/auth/login', headers: { 'email': data.email, 'password': data.password }, method: "post" });
    } catch (error) {
        return error.response
    }
}
export const registerRequest = async (data: DraftDeveloper) => {
    try {
        return await axios.post('https://codebros.onrender.com/api/users/create-consultant', data);
    } catch (error) {
        console.error('Error al registrar el desarrollador:', error);
    }
}

export const profileRequest = async () => {
    await axios.get("https://codebros.onrender.com/api/users/consultants?isBusy=true")
}