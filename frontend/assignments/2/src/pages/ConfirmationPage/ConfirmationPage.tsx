import type { FC } from 'react';
import styles from './ConfirmationPage.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { calculateTotalPrice } from '../../services/api';

interface ConfirmationPageProps {
    bookingId: string;
};

const ConfirmationPage: FC<ConfirmationPageProps> = ({ bookingId }) => {
    const booking = useAppSelector(state => state.booking);
    const config = useAppSelector(state => state.config.configuration);

    const totalCost = calculateTotalPrice(booking, config);

    const getCleaningTypeName = () => {
        if (!config || !booking.cleaningType) return '';
        const cleaningType = config.cleaningTypes.find(ct => ct.id === booking.cleaningType);
        return cleaningType ? `${cleaningType.name} Cleaning` : '';
    };

    const getFrequencyName = () => {
        if (!config || !booking.frequency) return 'One time';
        const frequency = config.frequencies.find(f => f.id === booking.frequency);
        return frequency ? frequency.name : 'One time';
    };

    const formatDate = () => {
        if (!booking.date) return '';
        const date = new Date(booking.date);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className={styles.confirmationPage}>
            <div className={styles.container}>
                <div className={styles.successCard}>
                    <div className={styles.successIcon}>✅</div>
                    <h1 className={styles.successTitle}>BOOKING CONFIRMED</h1>
                    <p className={styles.successMessage}>
                        Thank you for choosing Cleanly! Your booking has been successfully confirmed.
                    </p>
                    <div className={styles.bookingId}>
                        <span className={styles.bookingIdLabel}>Booking ID:</span>
                        <span className={styles.bookingIdValue}>{bookingId}</span>
                    </div>
                </div>

                <div className={styles.detailsCard}>
                    <h2 className={styles.detailsTitle}>Booking Details</h2>

                    <div className={styles.detailsGrid}>
                        <div className={styles.detailItem}>
                            <div className={styles.detailIcon}>🧹</div>
                            <div className={styles.detailContent}>
                                <div className={styles.detailLabel}>Service Type</div>
                                <div className={styles.detailValue}>{getCleaningTypeName()}</div>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.detailIcon}>📅</div>
                            <div className={styles.detailContent}>
                                <div className={styles.detailLabel}>Date & Time</div>
                                <div className={styles.detailValue}>
                                    {formatDate()} at {booking.startTime}
                                </div>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.detailIcon}>⏱️</div>
                            <div className={styles.detailContent}>
                                <div className={styles.detailLabel}>Duration</div>
                                <div className={styles.detailValue}>{booking.hours} hours</div>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.detailIcon}>🔄</div>
                            <div className={styles.detailContent}>
                                <div className={styles.detailLabel}>Frequency</div>
                                <div className={styles.detailValue}>{getFrequencyName()}</div>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.detailIcon}>🏠</div>
                            <div className={styles.detailContent}>
                                <div className={styles.detailLabel}>Property</div>
                                <div className={styles.detailValue}>
                                    {booking.bedrooms} Bedroom{booking.bedrooms > 1 ? 's' : ''}, {booking.bathrooms} Bathroom{booking.bathrooms > 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.detailIcon}>📍</div>
                            <div className={styles.detailContent}>
                                <div className={styles.detailLabel}>Address</div>
                                <div className={styles.detailValue}>{booking.personalDetails.fullAddress}</div>
                            </div>
                        </div>

                        {booking.extras.length > 0 && (
                            <div className={styles.detailItem}>
                                <div className={styles.detailIcon}>✨</div>
                                <div className={styles.detailContent}>
                                    <div className={styles.detailLabel}>Extras</div>
                                    <div className={styles.detailValue}>
                                        {booking.extras.map(extraId => {
                                            const extra = config?.extraOptions.find(e => e.id === extraId);
                                            return extra?.name;
                                        }).join(', ')}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className={styles.detailItem}>
                            <div className={styles.detailIcon}>📧</div>
                            <div className={styles.detailContent}>
                                <div className={styles.detailLabel}>Contact</div>
                                <div className={styles.detailValue}>
                                    {booking.personalDetails.email}<br />
                                    {booking.personalDetails.phoneNumber}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.totalSection}>
                        <span className={styles.totalLabel}>Total Amount</span>
                        <span className={styles.totalAmount}>${totalCost}</span>
                    </div>

                    <div className={styles.nextSteps}>
                        <h3 className={styles.nextStepsTitle}>What's Next?</h3>
                        <ul className={styles.nextStepsList}>
                            <li>You will receive a confirmation email at {booking.personalDetails.email}</li>
                            <li>Our team will contact you 24 hours before the appointment</li>
                            <li>Please ensure someone is available to provide access</li>
                            <li>Prepare any specific areas you'd like us to focus on</li>
                        </ul>
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={styles.printButton}
                            onClick={() => window.print()}
                        >
                            🖨️ Print Details
                        </button>
                        <button
                            className={styles.newBookingButton}
                            onClick={() => window.location.reload()}
                        >
                            📅 Make Another Booking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;