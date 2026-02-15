import type { BookingState, ValidationErrors } from "../types";


// Email Validation
export const validateEmail = (email: string): boolean => {
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailregex.test(email);
};

// Phone Number Validation
export const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneregex = /^[\d\s\-\(\)]+$/;
    const digitsOnly = phoneNumber.replaceAll(/\D/g, '');
    return phoneregex.test(phoneNumber) && digitsOnly.length >= 10;
};

// Credit card number vlidation
export const validateCreditCardNumber = (cardNumber: string): boolean => {
    const digitsOnly = cardNumber.replaceAll(/\s/g, '');
    if (!/^\d{13,19}$/.test(digitsOnly)) {
        return false;
    }
    return true;
}

// CVV validation
export const validateCVV = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv);
};

// Expiry date validation
export const validateExpiryDate = (month: string, year: string): boolean => {
    if (!month || !year) return false;

    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);

    if (expMonth < 1 || expMonth > 12) return false;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1;

    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;

    return true;
};

// Zip code validation
export const validateZipCode = (zipCode: string): boolean => {
    return /^\d{6}(-\d{4})?$/.test(zipCode);
};

// Date validation (must be today or future)
export const validateDate = (dateString: string): boolean => {
    if (!dateString) return false;

    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate >= today;
};

export const validateBooking = (booking: BookingState): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!booking.cleaningType) errors.cleaningType = 'Please select a cleaning type';
    if (!booking.frequency) {
        errors.frequency = 'Please select cleaning frequency';
    }

    if (booking.bedrooms < 1) {
        errors.bedrooms = 'At least 1 bedroom is required';
    }

    if (booking.bathrooms < 1) {
        errors.bathrooms = 'At least 1 bathroom is required';
    }

    if (booking.hours < 1) {
        errors.hours = 'Please select number of hours';
    }

    if (!booking.date) {
        errors.date = 'Please select a date';
    } else if (!validateDate(booking.date)) {
        errors.date = 'Please select today or a future date';
    }

    if (!booking.startTime) {
        errors.startTime = 'Please select a start time';
    }

    if (!booking.paymentDetails.cardNumber) {
        errors.cardNumber = 'Card number is required';
    } else if (!validateCreditCardNumber(booking.paymentDetails.cardNumber)) {
        errors.cardNumber = 'Invalid card number';
    }

    if (!booking.paymentDetails.expiryMonth || !booking.paymentDetails.expiryYear) {
        errors.expiry = 'Expiry date is required';
    } else if (!validateExpiryDate(booking.paymentDetails.expiryMonth, booking.paymentDetails.expiryYear)) {
        errors.expiry = 'Invalid or expired date';
    }

    if (!booking.paymentDetails.cvv) {
        errors.cvv = 'CVV is required';
    } else if (!validateCVV(booking.paymentDetails.cvv)) {
        errors.cvv = 'Invalid CVV';
    }

    if (!booking.paymentDetails.nameOnCard) {
        errors.nameOnCard = 'Name on card is required';
    } else if (booking.paymentDetails.nameOnCard.length < 3) {
        errors.nameOnCard = 'Please enter a valid name';
    }

    if (!booking.personalDetails.email) {
        errors.email = 'Email is required';
    } else if (!validateEmail(booking.personalDetails.email)) {
        errors.email = 'Invalid email address';
    }

    if (!booking.personalDetails.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(booking.personalDetails.phoneNumber)) {
        errors.phoneNumber = 'Invalid phone number';
    }

    if (!booking.personalDetails.fullAddress) {
        errors.fullAddress = 'Full address is required';
    } else if (booking.personalDetails.fullAddress.length < 10) {
        errors.fullAddress = 'Please enter a complete address';
    }

    if (!booking.personalDetails.zipCode) {
        errors.zipCode = 'ZIP code is required';
    } else if (!validateZipCode(booking.personalDetails.zipCode)) {
        errors.zipCode = 'Invalid ZIP code';
    }

    if (!booking.termsAccepted) {
        errors.terms = 'You must accept the terms and conditions';
    }

    return errors;
}

export const isBookingValid = (booking: BookingState): boolean => {
  const errors = validateBooking(booking);
  return Object.keys(errors).length === 0;
};

