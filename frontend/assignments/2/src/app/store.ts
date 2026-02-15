import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from '../features/booking/bookingSlice';
import configReducer from '../features/config/configSlice';
import type { RootState } from "../types";

export const store = configureStore({
    reducer: {
        booking: bookingReducer,
        config: configReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };