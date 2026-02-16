import { createSlice } from "@reduxjs/toolkit";
import type { StatusState } from "../../types";
import { fetchRegistrationStatus } from "./statusThunks";

const initialState: StatusState = {
    loading: false,
    error: null,
    status: null,
    registrationId: null,
    name: null,
    email: null,
    event: null,
}

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        clearStatusState: (state) => {
            state.loading = false;
            state.error = null;
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRegistrationStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        }) 
        .addCase(fetchRegistrationStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.registrationId = action.payload.registrationId;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.event = action.payload.event;
        })
        .addCase(fetchRegistrationStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || "Status fetch failed.";
        });
    },
});

export const { clearStatusState} = statusSlice.actions;
export default statusSlice.reducer;