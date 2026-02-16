import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from '../features/registration/registrationSlice';
import statusReducer from '../features/status/statusSlice';

export const store = configureStore({
    reducer: {
        registration: registrationReducer,
        status: statusReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;