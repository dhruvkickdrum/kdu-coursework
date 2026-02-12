import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import { useCreateUserMutation } from "../../api";
import type { CreateUserPayload } from "../../types";
import styles from './UserForm.module.scss';
import Loader from "../Loader";

const UserForm: FC = () => {
    const [createUser, { isLoading, isSuccess, isError, error }] = useCreateUserMutation();

    const [formData, setFormData] = useState<CreateUserPayload>({ firstName: '', lastName: '', email: '', age: 0 });
    const [errors, setErrors] = useState<Partial<Record<keyof CreateUserPayload, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof CreateUserPayload, boolean>>>({});

    const validateField = (name: keyof CreateUserPayload, value: string | number): string => {
        switch (name) {
            case 'firstName':
                if (!value || (typeof value === 'string' && value.trim().length === 0)) {
                    return 'First name is required';
                }
                if (typeof value === 'string' && value.trim().length < 2) {
                    return 'First name must be at least 2 characters';
                }
                return '';

            case 'lastName':
                if (!value || (typeof value === 'string' && value.trim().length === 0)) {
                    return 'Last name is required';
                }
                if (typeof value === 'string' && value.trim().length < 2) {
                    return 'Last name must be at least 2 characters';
                }
                return '';

            case 'email':
                { if (!value || (typeof value === 'string' && value.trim().length === 0)) {
                    return 'Email is required';
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (typeof value === 'string' && !emailRegex.test(value)) {
                    return 'Please enter a valid email address';
                }
                return ''; }

            case 'age':
                { const age = Number(value);
                if (!value || age === 0) {
                    return 'Age is required';
                }
                if (Number.isNaN(age)) {
                    return 'Age must be a number';
                }
                if (age < 1 || age > 120) {
                    return 'Age must be between 1 and 120';
                }
                return ''; }

            default:
                return '';
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value} = e.target;
        const fieldName = name as keyof CreateUserPayload;
        const fieldValue = fieldName === 'age' ? Number(value) : value;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
        }));

        if(touched[fieldName]) {
            const error = validateField(fieldName, fieldValue);
            setErrors((prev) => ({
                ...prev, [fieldName] : error,
            }));
        }


    }


    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof CreateUserPayload, string>> = {};
        let isValid = true;

        (Object.keys(formData) as Array<keyof CreateUserPayload>).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        setTouched({ firstName: true, lastName: true, email: true, age: true });
        return isValid;

    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await createUser(formData);
            setFormData({ firstName: '', lastName: '', email: '', age: 0 });
            setErrors({});
            setTouched({});
        } catch (err) {
            console.error("Failed to create user", err);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Add New User</h2>
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="firstName" className={styles.label}>First name <span className={styles.required}>*</span></label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className={`${styles.input} ${touched.firstName && errors.firstName ? styles.inputError : ''}`} placeholder="Enter first name" disabled={isLoading} />
                        {touched.firstName && errors.firstName && (
                            <span className={styles.errorMessage} role="alert">{errors.firstName}</span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="lastName" className={styles.label}>Last name <span className={styles.required}>*</span></label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={`${styles.input} ${touched.lastName && errors.lastName ? styles.inputError : ''}`} placeholder="Enter last name" disabled={isLoading} />
                        {touched.lastName && errors.lastName && (
                            <span className={styles.errorMessage} role="alert">{errors.lastName}</span>
                        )}
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email <span className={styles.required}>*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`} placeholder="Enter email..." disabled={isLoading} />
                    {touched.email && errors.email && (
                        <span className={styles.errorMessage} role="alert">{errors.email}</span>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="age" className={styles.label}>Age <span className={styles.required}>*</span></label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className={`${styles.input} ${touched.age && errors.age ? styles.inputError : ''}`} placeholder="Enter age.." disabled={isLoading} />
                    {touched.age && errors.age && (
                        <span className={styles.errorMessage} role="alert">{errors.age}</span>
                    )}
                </div>

                {isError && (
                    <div className={styles.alert} role="alert">
                        <span>Failed to create user.{' '}{error && 'data' in error ? String(error.data) : 'Please try again.'}</span>
                    </div>
                )}

                {isSuccess && (
                    <div className={`${styles.alert} ${styles.alertSuccess}`} role="status">
                        <span>User created successfully!</span>
                    </div>
                )}

                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader size="small" />
                            Creating user...
                        </>
                    ) : ('Add User')}
                </button>
            </form>
        </div>
    )
}

export default UserForm;