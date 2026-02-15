export type CleaningType = 'STANDARD' | 'DEEP' | 'MOVE_IN_OUT';

export interface CleaningTypeOption {
  id: CleaningType;
  name: string;
  basePrice: number;
  description?: string;
}


export type CleaningFrequency = 'ONE_TIME' | 'WEEKLY' | 'BI_WEEKLY' | 'MONTHLY';

export interface FrequencyOption {
  id: CleaningFrequency;
  name: string;
  discount?: number;
}


export type ExtraOptionType = 'CLEAN_OVEN' | 'CLEAN_WINDOWS' | 'CLEAN_FRIDGE' | 'IRONING';

export interface ExtraOption {
  id: ExtraOptionType;
  name: string;
  price: number;
}


export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}


export interface BookingState {
  cleaningType: CleaningType | null;
  frequency: CleaningFrequency | null;
  bedrooms: number;
  bathrooms: number;
  hours: number;
  date: string;
  startTime: string;
  extras: ExtraOptionType[];
  specialRequirements: string;
  paymentDetails: PaymentDetails;
  personalDetails: PersonalDetails;
  termsAccepted: boolean;
}


export interface PaymentDetails {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  nameOnCard: string;
}


export interface PersonalDetails {
  email: string;
  phoneNumber: string;
  fullAddress: string;
  zipCode: string;
}


export interface Configuration {
  cleaningTypes: CleaningTypeOption[];
  frequencies: FrequencyOption[];
  extraOptions: ExtraOption[];
  timeSlots: TimeSlot[];
}


export interface ValidationErrors {
  [key: string]: string;
}


export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message?: string;
}


export interface RootState {
  booking: BookingState;
  config: ConfigState;
}

export interface ConfigState {
  configuration: Configuration | null;
  loading: boolean;
  error: string | null;
}