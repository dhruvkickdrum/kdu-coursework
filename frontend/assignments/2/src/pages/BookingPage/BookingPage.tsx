import { useState, type FC } from 'react';
import styles from './BookingPage.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { validateBooking } from '../../utils/validation';
import { submitBooking } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import CleaningPreferences from '../../components/CleaningPreferences/CleaningPreference';
import HoursAndDate from '../../components/HoursAndDate/HoursAndDate';
import PaymentMethod from '../../components/PaymentMethod/PaymentModule';
import PersonalDetails from '../../components/PersonalDetails/PersonalDetails';
import BookingSummary from '../../components/BookingSummary/BookingSummary';

interface BookingPageProps {
    onBookingSuccess: (bookingId: string) => void;
}

const BookingPage: FC<BookingPageProps> = ({ onBookingSuccess }) => {
    const booking = useAppSelector(state => state.booking);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCompleteBooking = async () => {
        const validationErrors = validateBooking(booking);

        if (Object.keys(validationErrors).length > 0) {
            const firstError = Object.values(validationErrors)[0];
            setError(firstError);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setError(null), 5000);
            return;
        }
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await submitBooking(booking);
            if (res.success && res.bookingId) {
                onBookingSuccess(res.bookingId);
            } else {
                setError(res.message || 'Booking failed. Please try again');
            }
        } catch (err) {
            setError("An Error occurred, Please try again");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isButtonDisabled = !booking.termsAccepted || isSubmitting;

    return (
        <div className={styles.bookingPage}>
            {isSubmitting && (
                <div className={styles.loadingOverlay}>
                    <Loader size="large" message="Processing your booking..." />
                </div>
            )}

            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Book your cleaning</h1>
                    <p className={styles.pageSubtitle}>
                        It's time to book our cleaning service for your home or apartment.
                    </p>
                </div>

                {error && (
                    <div className={styles.errorBanner}>
                        <span className={styles.errorIcon}>⚠️</span>
                        {error}
                    </div>
                )}

                <div className={styles.content}>
                    <div className={styles.mainContent}>
                        <CleaningPreferences />
                        <HoursAndDate />
                        <PaymentMethod />
                        <PersonalDetails />

                        <button
                            className={styles.submitButton}
                            onClick={handleCompleteBooking}
                            disabled={isButtonDisabled}
                        >
                            Complete Booking
                        </button>
                    </div>

                    <div className={styles.sidebar}>
                        <BookingSummary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;