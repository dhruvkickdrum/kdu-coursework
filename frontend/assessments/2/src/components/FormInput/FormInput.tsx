import type { FC } from "react";
import styles from './FormInput.module.scss';
interface FormInputProps {
    label: string;
    name: string;
    value: string;
    onchange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    error?: string;
    type?: string;
    as?: 'input' | 'textarea'| 'select';
    options?: string[];
}

const FormInput: FC<FormInputProps> = ({ label, name, value, onchange, error, type = "text", as="input", options=[] }) => {
    const fieldClass = `${styles.field} ${error ? styles.fieldError : ''}`.trim();

    return (
        <div className={styles.form_group}>
            <label className={styles.label}>{label}</label>
            {as === 'textarea' && (
                <textarea className={`${fieldClass} ${styles.textarea}`} name={name} value={value} onChange={onchange} />
            )}
            {as === 'select' && (
                <select className={`${fieldClass} ${styles.select}`} name={name} value={value} onChange={onchange}>
                    <option value="">Select Event</option>
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            )}

            {as === 'input' && (
                <input className={fieldClass} type={type} name={name} value={value} onChange={onchange} />
            )}

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    )
}

export default FormInput;