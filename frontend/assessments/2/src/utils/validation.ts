import type { RegistrationFormData } from "../types";

export const validateRegistrationForm = (data: RegistrationFormData) : Record<string, string> => {
    const errors: Record<string, string> = {};
    if(!data.name.trim()) errors.name = "Name is required";
    if(!data.email.trim()) {
        errors.email = "Email is required";
    } else if(!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Invalid email format";
    }
    if(!data.event.trim()) errors.event = "Event is required";
    return errors;
};