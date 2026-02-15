import { useState, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updatePaymentDetails } from "../../features/booking/bookingSlice";
import { validateCreditCardNumber, validateCVV, validateExpiryDate } from "../../utils/validation";
import styles from './PaymentMethod.module.scss';


const PaymentMethod: FC = () => {
    const dispatch = useAppDispatch();
    const paymentDetails = useAppSelector(state => state.booking.paymentDetails);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const formateCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, '');
        const chunks = cleaned.match(/.{1,4}/g) || [];
        return chunks.join(' ');
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, '');
        if (value.length <= 16 && /^\d*$/.test(value)) {
            dispatch(updatePaymentDetails({ cardNumber: value }));
            if (errors.cardNumber) {
                setErrors(prev => ({ ...prev, cardNumber: '' }));
            }
        }
    };

    const handleCardNumberBlur = () => {
        if (paymentDetails.cardNumber && !validateCreditCardNumber(paymentDetails.cardNumber)) {
            setErrors(prev => ({ ...prev, cardNumber: 'Invalid card number' }));
        }
    };

    const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 2 && /^\d*$/.test(value)) {
            dispatch(updatePaymentDetails({ expiryMonth: value }));
            if (errors.expiry) {
                setErrors(prev => ({ ...prev, expiry: '' }));
            }
        }
    };

    const handleExpiryYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 2 && /^\d*$/.test(value)) {
            dispatch(updatePaymentDetails({ expiryYear: value }));
            if (errors.expiry) {
                setErrors(prev => ({ ...prev, expiry: '' }));
            }
        }
    };

    const handleExpiryBlur = () => {
        if (paymentDetails.expiryMonth && paymentDetails.expiryYear) {
            if (!validateExpiryDate(paymentDetails.expiryMonth, paymentDetails.expiryYear)) {
                setErrors(prev => ({ ...prev, expiry: 'Invalid or expired date' }));
            }
        }
    };

    const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 4 && /^\d*$/.test(value)) {
            dispatch(updatePaymentDetails({ cvv: value }));
            if (errors.cvv) {
                setErrors(prev => ({ ...prev, cvv: '' }));
            }
        }
    };

    const handleCVVBlur = () => {
        if (paymentDetails.cvv && !validateCVV(paymentDetails.cvv)) {
            setErrors(prev => ({ ...prev, cvv: 'Invalid CVV' }));
        }
    };

    return (
        <div className={styles.paymentMethod}>
            <div className={styles.header}>
                <h3 className={styles.title}>Payment Method</h3>
            </div>
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Credit card details</h4>

                <div className={styles.formGroup}>
                    <input type="text" className={`${styles.input} ${styles.cardNumber} ${errors.cardNumber ? styles.error : ''}`} placeholder="Card Number" value={formateCardNumber(paymentDetails.cardNumber)} onChange={handleCardNumberChange} onBlur={handleCardNumberBlur} />
                    <span className={styles.cardBrand}>VISA</span>
                    {errors.cardNumber && <span className={styles.errorText}>{errors.cardNumber}</span>}
                </div>

                <div className={styles.cardDetailRow}>
                    <div className={styles.formGroup}>
                        <div className={styles.expiryGroup}>
                            <input type="text" className={`${styles.input} ${styles.expiryInput} ${errors.expiry ? styles.error : ''}`} placeholder="MM" value={paymentDetails.expiryMonth} onChange={handleExpiryMonthChange} onBlur={handleExpiryBlur} maxLength={2} />
                            <span className={styles.seperator}>/</span>
                            <input type="text" className={`${styles.input} ${styles.expiryInput} ${errors.expiry ? styles.error : ''}`} placeholder="YY" value={paymentDetails.expiryYear} onChange={handleExpiryYearChange} onBlur={handleExpiryBlur} maxLength={2} />
                        </div>
                        {errors.expiry && <span className={styles.errorText}>{errors.expiry}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={`${styles.input} ${errors.cvv ? styles.error : ''}`}
                            placeholder="CVV"
                            value={paymentDetails.cvv}
                            onChange={handleCVVChange}
                            onBlur={handleCVVBlur}
                            maxLength={4}
                        />
                        {errors.cvv && <span className={styles.errorText}>{errors.cvv}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Name as on Card"
                            value={paymentDetails.nameOnCard}
                            onChange={(e) => dispatch(updatePaymentDetails({ nameOnCard: e.target.value }))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;