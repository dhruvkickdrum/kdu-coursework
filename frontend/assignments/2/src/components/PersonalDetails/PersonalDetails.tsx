import { useState, type FC } from 'react';
import styles from './PersonalDetails.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { validateEmail, validatePhoneNumber, validateZipCode } from '../../utils/validation';
import { setTermsAccepted, updatePersonalDetails } from '../../features/booking/bookingSlice';

const PersonalDetails: FC = () => {
    const dispatch = useAppDispatch();
    const { personalDetails, termsAccepted } = useAppSelector(state => state.booking);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleEmailBlur = () => {
        if (personalDetails.email && !validateEmail(personalDetails.email)) {
            setErrors(prev => ({ ...prev, email: 'Invalid email address' }));
        } else {
            setErrors(prev => ({ ...prev, email: '' }));
        }
    };

    const handlePhoneBlur = () => {
        if (personalDetails.phoneNumber && !validatePhoneNumber(personalDetails.phoneNumber)) {
            setErrors(prev => ({ ...prev, phone: 'Invalid phone number' }));
        } else {
            setErrors(prev => ({ ...prev, phone: '' }));
        }
    };

    const handleZipCodeBlur = () => {
        if (personalDetails.zipCode && !validateZipCode(personalDetails.zipCode)) {
            setErrors(prev => ({ ...prev, zipCode: 'Invalid ZIP code' }));
        } else {
            setErrors(prev => ({ ...prev, zipCode: '' }));
        }
    };

    return (
        <div className={styles.personalDetails}>
            <h4 className={styles.title}>Personal Details</h4>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        className={`${styles.input} ${errors.email ? styles.error : ''}`}
                        placeholder="Email Address"
                        value={personalDetails.email}
                        onChange={(e) => dispatch(updatePersonalDetails({ email: e.target.value }))}
                        onBlur={handleEmailBlur}
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                    <input
                        type="tel"
                        className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                        placeholder="Phone Number"
                        value={personalDetails.phoneNumber}
                        onChange={(e) => dispatch(updatePersonalDetails({ phoneNumber: e.target.value }))}
                        onBlur={handlePhoneBlur}
                    />
                    {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={`${styles.formGroup} ${styles.addressGroup}`}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Your Full Address"
                        value={personalDetails.fullAddress}
                        onChange={(e) => dispatch(updatePersonalDetails({ fullAddress: e.target.value }))}
                    />
                </div>

                <div className={styles.formGroup}>
                    <input
                        type="text"
                        className={`${styles.input} ${errors.zipCode ? styles.error : ''}`}
                        placeholder="ZIP Code"
                        value={personalDetails.zipCode}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^\d-]/g, '');
                            dispatch(updatePersonalDetails({ zipCode: value }));
                        }}
                        onBlur={handleZipCodeBlur}
                        maxLength={10}
                    />
                    {errors.zipCode && <span className={styles.errorText}>{errors.zipCode}</span>}
                </div>
            </div>

            <div className={styles.termsSection}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={termsAccepted}
                        onChange={(e) => dispatch(setTermsAccepted(e.target.checked))}
                    />
                    <span className={styles.checkboxText}>
                        I read and agree to the{' '}
                        <a href="#terms" className={styles.link}>
                            terms & conditions
                        </a>
                    </span>
                </label>
            </div>
        </div>
    );
};

export default PersonalDetails;