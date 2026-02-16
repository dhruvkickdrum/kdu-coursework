import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { RegistrationFormData } from "../../types";
import { validateRegistrationForm } from "../../utils/validation";
import { registerEvent } from "../../features/registration/registrationThunks";
import FormInput from "../../components/FormInput/FormInput";
import Loader from "../../components/Loader/Loader";
import styles from './RegistrationPage.module.scss';

const events = ["Event 1", "Event 2", "Event 3", "Event 4"];

const RegistrationPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state) => state.registration);
    const [formData, setFormData] = useState<RegistrationFormData>({name:"", email:"", event:"", message:""});
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateRegistrationForm(formData);
        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        const res = await dispatch(registerEvent(formData));
        if(registerEvent.fulfilled.match(res)) {
            navigate(`/status/${res.payload.registrationId}`);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Registration Page</h2>
            <section className={styles.banner}>Event Registration</section>
            <form className={styles.form} onSubmit={handleSubmit}>
                <FormInput label="Name" name="name" value={formData.name} onchange={handleChange} error={errors.name} />
                <FormInput label="Email" name="email" value={formData.email} onchange={handleChange} error={errors.email} />
                <FormInput label="Event" name="event" value={formData.event} onchange={handleChange} error={errors.event} as="select" options={events}  />
                <FormInput label="Message" name="message" value={formData.message} onchange={handleChange} error={errors.message} as="textarea" />
                <button className={styles.button} type="submit" disabled={loading}>{loading ? "Submitting" : "Register"}</button>
            </form>
            {loading && <Loader />}
        </div>
    );
}

export default RegistrationPage;