import { createAsyncThunk } from "@reduxjs/toolkit";
import type { StatusResponse } from "../../types";
import { getRegistrationStatusApi } from "../../services/api";

export const fetchRegistrationStatus = createAsyncThunk<StatusResponse, string, {rejectValue: string}> (
    "/status",
    async (registrationId, { rejectWithValue}) => {
        try {
            return await getRegistrationStatusApi(registrationId);
        } catch(err: any) {
            return rejectWithValue(err.message);
        }

    }
)