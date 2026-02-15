import type { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setBathrooms, setBedrooms, setCleaningType, setFrequency, setSpecialRequirements, toggleExtra } from "../../features/booking/bookingSlice";
import styles from './CleaningPreferences.module.scss';
import type { CleaningFrequency, CleaningType, ExtraOptionType } from "../../types";

const CleaningPreferences: FC = () => {
    const dispatch = useAppDispatch();
    const booking = useAppSelector(state => state.booking);
    const config = useAppSelector(state => state.config.configuration);
    if (!config) return null;

    const handleBathroomsChange = (d: number) => {
        const newValue = Math.max(1, booking.bathrooms + d);
        dispatch(setBathrooms(newValue));
    }

    const handleBedroomsChange = (d: number) => {
        const newValue = Math.max(1, booking.bedrooms + d);
        dispatch(setBedrooms(newValue));
    }

    return (
        <div className={styles.cleaningPreferences}>
            <h2 className={styles.header}>Cleaning Preferences</h2>
            <div className={styles.section}>
                <label className={styles.label}>What type of cleaning?</label>
                <div className={styles.optionGroup}>
                    {config.cleaningTypes.map(type => (
                        <button className={`${styles.optionButton} ${booking.cleaningType == type.id ? styles.active : ''}`} key={type.id} onClick={() => dispatch(setCleaningType(type.id as CleaningType))}>{type.name}</button>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>How often would you like cleaning?</label>
                <div className={styles.optionGroup}>
                    {config.frequencies.map(freq => (
                        <button className={`${styles.optionButton} ${booking.frequency == freq.id ? styles.active : ''} ${freq.id === 'WEEKLY' ? styles.recommended : ''}`} key={freq.id} onClick={() => dispatch(setFrequency(freq.id as CleaningFrequency))}>{freq.name} {freq.discount && freq.discount > 0 ? (
                            <span className={styles.discount}>-{freq.discount}%</span>
                        ) : null}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>Tell us about your home</label>
                <div className={styles.roomCounter}>
                    <div className={styles.counterCard}>
                        <div className={styles.counterIcon}>🛏️</div>
                        <label className={styles.counterLabel}>BEDROOMS</label>
                        <div className={styles.counterControls}>
                            <button className={styles.counterButton} onClick={() => handleBedroomsChange(-1)} disabled={booking.bedrooms <= 1}>-</button>
                            <span className={styles.counterValue}>{booking.bedrooms}</span>
                            <button className={styles.counterButton} onClick={() => handleBedroomsChange(1)}>+</button>
                        </div>
                    </div>

                    <div className={styles.counterCard}>
                        <div className={styles.counterIcon}>🚿</div>
                        <label className={styles.counterLabel}>BATHROOMS</label>
                        <div className={styles.counterControls}>
                            <button className={styles.counterButton} onClick={() => handleBathroomsChange(-1)} disabled={booking.bathrooms <= 1}>-</button>
                            <span className={styles.counterValue}>{booking.bathrooms}</span>
                            <button className={styles.counterButton} onClick={() => handleBathroomsChange(1)}>+</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>Need any extras?</label>
                <div className={styles.extrasGrid}>
                    {config.extraOptions.map(extra => (
                        <button
                            key={extra.id}
                            className={`${styles.extraCard} ${booking.extras.includes(extra.id as ExtraOptionType) ? styles.active : ''
                                }`}
                            onClick={() => dispatch(toggleExtra(extra.id as ExtraOptionType))}
                        >
                            <div className={styles.extraIcon}>
                                {getExtraIcon(extra.id)}
                            </div>
                            <span className={styles.extraName}>{extra.name}</span>
                            <span className={styles.extraPrice}>+${extra.price}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>Do you have any special requirements? <span className={styles.optional}>(optional)</span></label>
                <textarea className={styles.textarea} placeholder="Any specific instructions or requirements..." value={booking.specialRequirements} onChange={(e) => dispatch(setSpecialRequirements(e.target.value))} rows={4} />
            </div>
        </div>
    );
};

const getExtraIcon = (extraId: string): string => {
  const icons: { [key: string]: string } = {
    CLEAN_OVEN: '🔥',
    CLEAN_WINDOWS: '🪟',
    CLEAN_FRIDGE: '🧊',
    IRONING: '👔',
  };
  return icons[extraId] || '✨';
}

export default CleaningPreferences;