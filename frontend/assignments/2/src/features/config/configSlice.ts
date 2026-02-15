import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ConfigState, Configuration } from "../../types";
import { fetchConfigData } from "../../services/api";

const initialState: ConfigState = {
    configuration: null,
    loading: false,
    error: null,
};

// Async thunk to fetch configuration
export const loadingConfiguration = createAsyncThunk('config/loadConfiguration',async(_, { rejectWithValue }) => {
    try {
        const config = await fetchConfigData();
        return config;
    } catch(err : any) {
        return rejectWithValue(err.message || "Failed to load configuration");
    }
});

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadingConfiguration.pending, (state) => {
            state.loading = true,
            state.error = null;
        })
        .addCase(loadingConfiguration.fulfilled, (state, action: PayloadAction<Configuration>) => {
            state.loading = false;
            state.configuration = action.payload;
        })
        .addCase(loadingConfiguration.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default configSlice.reducer;