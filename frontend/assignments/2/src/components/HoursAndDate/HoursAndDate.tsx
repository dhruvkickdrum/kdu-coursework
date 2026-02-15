import type { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setDate, setHours, setStartTime } from "../../features/booking/bookingSlice";
import styles from './HoursAndDate.module.scss';
const HoursAndDate: FC = () => {
    const dispatch = useAppDispatch();
    const booking = useAppSelector(state => state.booking);
    const config = useAppSelector(state => state.config.configuration);

    if(!config) return null;

    const handleHoursChange =(d : number)=> {
        const newValue = Math.max(1, Math.min(12, booking.hours + d));
        dispatch(setHours(newValue));
    }

    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <div className={styles.hoursAndDate}>
            <h3 className={styles.title}>Choose hours and dates</h3>
            <div className={styles.section}>
                <label className={styles.label}>How Many hours?</label>
                <div className={styles.hoursControl}>
                    <button className={styles.hoursButton} onClick={() => handleHoursChange(-1)} disabled={booking.hours <= 1}>-</button>
                    <span className={styles.hoursValue}>{booking.hours}</span>
                    <button className={styles.hoursButton} onClick={() => handleHoursChange(1)} disabled={booking.hours >= 12}>+</button>
                </div>
                <p className={styles.hint}>This is what we think the best on your preferences. Feel free to change if you want</p>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>Choose a date?</label>
                <input type="date" className={styles.dateInput} value={booking.date} onChange={(e) => dispatch(setDate(e.target.value))} min={getMinDate()} />
            </div>

            <div className={styles.section}>
                <label className={styles.label}>When do you like to start?</label>
                <div className={styles.timeSlots}>
                    {config.timeSlots.map(slot => (
                        <button key={slot.id} className={`${styles.timeSlot} ${booking.startTime === slot.time ? styles.active : ''} ${!slot.available ? styles.disabled : ''}`} onClick={() => slot.available && dispatch(setStartTime(slot.time))} disabled={!slot.available}>{slot.time}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default HoursAndDate;