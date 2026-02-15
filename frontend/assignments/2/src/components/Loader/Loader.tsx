import type { FC } from "react";
import styles from './Loader.module.scss';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
}

const Loader: FC<LoaderProps> = ({ size='medium', message}) => {
    return (
        <div className={styles.loaderContainer}>
            <div className={`${styles.spinner} ${styles[size]}`}></div>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    )
};

export default Loader;