import type { FC } from 'react';
import styles from './BookingSummary.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { calculateTotalPrice } from '../../services/api';

const BookingSummary: FC = () => {
    const booking = useAppSelector(state => state.booking);
    const config = useAppSelector(state => state.config.configuration);

    const totalCost = calculateTotalPrice(booking, config);


    const getCleaningTypeName = () => {
        if (!config || !booking.cleaningType) return 'Select cleaning type';
        const cleaningType = config.cleaningTypes.find(ct => ct.id === booking.cleaningType);
        return cleaningType ? `${cleaningType.name} Cleaning` : 'Select cleaning type';
    };

    const getFrequencyName = () => {
        if (!config || !booking.frequency) return 'One time';
        const frequency = config.frequencies.find(f => f.id === booking.frequency);
        return frequency ? frequency.name : 'One time';
    };

    const formatDate = () => {
        if (!booking.date) return 'Choose date';
        const date = new Date(booking.date);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = () => {
        return booking.startTime || 'Choose time';
    };

    return (
        <div className={styles.bookingSummary}>
            <h2 className={styles.header}>Booking Summary</h2>

            <div className={styles.content}>
                <div className={styles.summaryItem}>
                    <span className={styles.icon}>🧹</span>
                    <span className={styles.text}>{getCleaningTypeName()}    </span>
                </div>

                <div className={styles.summaryItem}>
                    <span className={styles.icon}>📅</span>
                    <span className={styles.text}>
                        {formatDate()} @ {formatTime()}
                    </span>
                </div>

                <div className={styles.summaryItem}>
                    <span className={styles.icon}>⏱️</span>
                    <span className={styles.text}>{booking.hours} hours</span>
                </div>

                <div className={styles.summaryItem}>
                    <span className={styles.icon}>🔄</span>
                    <span className={styles.text}>{getFrequencyName()}</span>
                </div>

                {booking.personalDetails.fullAddress && (
                    <div className={styles.summaryItem}>
                        <span className={styles.icon}>📍</span>
                        <span className={styles.text}>{booking.personalDetails.fullAddress}</span>
                    </div>
                )}

                {booking.extras.length > 0 && (
                    <div className={styles.summaryItem}>
                        <span className={styles.icon}>✨</span>
                        <div className={styles.extrasList}>
                            {booking.extras.map(extraId => {
                                const extra = config?.extraOptions.find(e => e.id === extraId);
                                return extra ? (
                                    <span key={extraId} className={styles.extraItem}>
                                        {extra.name}
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.totalSection}>
                <span className={styles.totalLabel}>Total cost</span>
                <span className={styles.totalAmount}>${totalCost}</span>
            </div>
        </div>
    );
};

export default BookingSummary;