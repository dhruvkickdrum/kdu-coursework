export interface RegistrationFormData {
    name: string;
    email: string;
    event: string;
    message: string;
}

export interface RegistrationResponse {
    registrationId: string;
}

export interface RegistrationState {
    loading: boolean;
    error: string | null;
    registrationid: string | null;
}

export type RegistrationStatusTypes = "Queued" | "Confirmed" | "Failed" | null;


export interface StatusResponse {
    email: string | null;
    event: string | null;
    name: string | null;
    registrationId: string;
    status: RegistrationStatusTypes;
}

export interface StatusState {
    loading: boolean;
    error: string | null;
    status: RegistrationStatusTypes;
    registrationId: string | null;
    name: string | null;
    email: string | null;
    event: string | null;
}

export interface ApiError {
    message: string;
}