import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RegistrationFormData, RegistrationResponse } from "../../types";
import { registerApi } from "../../services/api";


export const registerEvent = createAsyncThunk<RegistrationResponse, RegistrationFormData, {rejectValue: string}> (
    "/registration",
    async (formData, { rejectWithValue} ) => {
        try {
            return await registerApi(formData);
        } catch(err: any) {
            return rejectWithValue(err.message);
        }
    }
)