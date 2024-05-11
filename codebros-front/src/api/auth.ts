import axios from "axios";
import type { LoginUser, DraftDeveloper, ApplicantType, ProjectType } from '../types'
import { authApi } from '../libs/axios';


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
        return error
    }
}

export const registerInformationConsult = async (data: ApplicantType) => {
    try {
        const response = await authApi.post('/users/register-information', data);
        return response;
    } catch (error) {
        return error

    }
};

export const postProyectRequest = async (data: ProjectType) => {
    try {
        const response = await authApi.post('/projects', data);
        return response;
    } catch (error) {
        return error
    }
}

export const getProyectRequest = async (matched) => {
    console.log(matched)
    try {
        const response = await authApi.get(`/projects/all/${matched}`)
        return response;

    } catch (error) {
        return error
    }
}

export const getConsultantsRequest = async () => {
    try {
        const response = await authApi.get('/users/consultants')
        return response;
    } catch (error) {
        return error
    }
}

export const getConsultantsRequestId = async (consultantId) => {
    try {
        const response = await authApi.get(`/users/consultant/${consultantId}`)
        return response;
    } catch (error) {
        return error
    }
}

export const getMatchingsRequest = async (projectId) => {
    try {
        const response = await authApi.get(`/ai/matching/${projectId}`)
        console.log(response)
        return response;

    } catch (error) {
        return error
    }
}

export const deleteProjectRequest = async (projectId) => {
    try {
        const response = await authApi.delete(`/projects/${projectId}`)
        return response;
    } catch (error) {
        return error
    }
}




export const profileRequest = async () => {
    await axios.get("https://codebros.onrender.com/api/users/consultants?isBusy=true")
}