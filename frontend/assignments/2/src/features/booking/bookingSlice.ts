import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookingState, CleaningType, CleaningFrequency, ExtraOptionType } from "../../types";

const initialState: BookingState = {
    cleaningType: null,
    frequency: null,
    bedrooms: 1,
    bathrooms: 1,
    hours: 4,
    date: '',
    startTime: '',
    extras: [],
    specialRequirements: '',
    paymentDetails: {
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        nameOnCard: '',
    },
    personalDetails: {
        email: '',
        phoneNumber: '',
        fullAddress: '',
        zipCode: '',
    },
    termsAccepted: false,
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setCleaningType: (state, action: PayloadAction<CleaningType>) => {
            state.cleaningType = action.payload;
        },
        setFrequency: (state, action: PayloadAction<CleaningFrequency>) => {
            state.frequency = action.payload;
        },
        setBedrooms: (state, action: PayloadAction<number>) => {
            state.bedrooms = action.payload;
        },
        setBathrooms: (state, action: PayloadAction<number>) => {
            state.bathrooms = action.payload;
        },
        setHours: (state, action: PayloadAction<number>) => {
            state.hours = action.payload;
        },
        setDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        },
        setStartTime: (state, action: PayloadAction<string>) => {
            state.startTime = action.payload;
        },
        toggleExtra: (state, action: PayloadAction<ExtraOptionType>) => {
            const extraIndex = state.extras.indexOf(action.payload);
            if (extraIndex > -1) {
                state.extras.splice(extraIndex, 1);
            } else {
                state.extras.push(action.payload);
            }
        },
        setSpecialRequirements: (state, action: PayloadAction<string>) => {
            state.specialRequirements = action.payload;
        },
        updatePaymentDetails: (state, action: PayloadAction<Partial<BookingState['paymentDetails']>>) => {
            state.paymentDetails = { ...state.paymentDetails, ...action.payload };
        },
        updatePersonalDetails: (state, action: PayloadAction<Partial<BookingState['personalDetails']>>) => {
            state.personalDetails = { ...state.personalDetails, ...action.payload };
        },
        setTermsAccepted: (state, action: PayloadAction<boolean>) => {
            state.termsAccepted = action.payload;
        },
        resetBooking: () => initialState,
    },
});

export const {
    setCleaningType,
    setFrequency,
    setBedrooms,
    setBathrooms,
    setHours,
    setDate,
    setStartTime,
    toggleExtra,
    setSpecialRequirements,
    updatePaymentDetails,
    updatePersonalDetails,
    setTermsAccepted,
    resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;