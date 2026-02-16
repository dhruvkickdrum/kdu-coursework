import { createSlice } from "@reduxjs/toolkit";
import type { RegistrationState } from "../../types";
import { registerEvent } from "./registrationThunks";

const initialState: RegistrationState = {
    loading: false,
    error: null,
    registrationid: null,
}

const registrationSlice = createSlice({
    name: 'registation',
    initialState,
    reducers: {
        clearRegistrationState: (state) => {
            state.loading = false;
            state.error = null;
            state.registrationid= null;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(registerEvent.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.registrationid = action.payload.registrationId;
        })
        .addCase(registerEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || "Registration failed.";
        });
    },
});

export const { clearRegistrationState } = registrationSlice.actions;
export default registrationSlice.reducer;