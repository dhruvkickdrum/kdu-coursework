import type { AxiosInstance } from "axios";
import axios from "axios";
import type { RegistrationFormData, RegistrationResponse, StatusResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": 'application/json',
    },
    timeout: 10000,
});

export const registerApi = async (data: RegistrationFormData): Promise<RegistrationResponse> => {
    const response = await api.post<RegistrationResponse>("/register", data);
    return response.data;
}

export const getRegistrationStatusApi = async (registrationId: string): Promise<StatusResponse> => {
    const response = await api.get<StatusResponse>(`/registration-status/${registrationId}`);
    return response.data;
}