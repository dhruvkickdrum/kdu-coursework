import axios from "axios";
import type { BookingResponse, BookingState, Configuration } from "../types";

const API_CONFIG = {
    CONFIG_API_URL: import.meta.env.VITE_CONFIG_API_URL || '',
    BOOKING_API_URL: import.meta.env.VITE_BOOKING_API_URL || '',
};

// Fetch configuration data from aws lambda  via api gateway // PENDING
export const fetchConfigData = async (): Promise<Configuration> => {
    try {
        const res = await axios.get<Configuration>(API_CONFIG.CONFIG_API_URL);
        return res.data;
    } catch (err) {
        console.error("Error fetching configuration: ", err);
        throw new Error("Failes to fetch configuration");
    }
};

// Submit booking posts to aqs lambda via api gateway , stores in dynamodb
export const submitBooking = async (bookingData: BookingState): Promise<BookingResponse> => {
    try {
        const res = await axios.post<BookingResponse>(
            API_CONFIG.BOOKING_API_URL,
            bookingData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error submitting booking: ", err);
        throw new Error("Failes to submit booking");
    }
};

// Calculate total price based on booking details
export const calculateTotalPrice = (bookingState: BookingState, configuration: Configuration | null): number => {
    if (!configuration || !bookingState.cleaningType) return 0;

    // Get price from cleaning type
    const cleaningType = configuration.cleaningTypes.find(ct => ct.id === bookingState.cleaningType);
    if (!cleaningType) return 0;
    let totalPrice = cleaningType.basePrice;

    // Add the cost based on hours
    const baseHours = 4;
    if (bookingState.hours > baseHours) {
        totalPrice += (bookingState.hours - baseHours) * 30; // 30 dollar per additional hour
    }

    // Add cost for extra rooms
    const baseBedrooms = 1;
    const baseBathrooms = 1;
    if (bookingState.bedrooms > baseBedrooms) {
        totalPrice += (bookingState.bedrooms - baseBedrooms) * 20;
    }
    if (bookingState.bathrooms > baseBathrooms) {
        totalPrice += (bookingState.bathrooms - baseBathrooms) * 15;
    }

    // Add extras
    bookingState.extras.forEach(extraId => {
        const extra = configuration.extraOptions.find(e => e.id === extraId);
        if (extra) totalPrice += extra.price;
    });

    // apply frequency discount
    if (bookingState.frequency) {
        const frequency = configuration.frequencies.find(f => f.id === bookingState.frequency);
        if (frequency && frequency.discount) {
            totalPrice += totalPrice * (1 - frequency.discount / 100);
        }
    }

    return Math.round(totalPrice);
};

export default { fetchConfigData, submitBooking, calculateTotalPrice };



