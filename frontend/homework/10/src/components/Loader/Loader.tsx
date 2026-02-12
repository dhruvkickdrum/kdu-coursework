import type { FC } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
    message?: string
    size?: 'small' | 'medium' | 'large'
    fullscreen?: boolean
}
const Loader: FC<LoaderProps> = ({size = 'medium',message,fullscreen = false,}) => {
    const loaderContent = (
        <div className={styles.loaderContent}>
            <div className={`${styles.spinner} ${styles[size]}`}>
                <div className={styles.spinnerCircle}></div>
                <div className={styles.spinnerCircle}></div>
                <div className={styles.spinnerCircle}></div>
                <div className={styles.spinnerCircle}></div>
            </div>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );

    if (fullscreen) {
        return (
            <div className={styles.fullScreenLoader}>
                {loaderContent}
            </div>
        );
    }

    return <div className={styles.loader}>{loaderContent}</div>;
};

export default Loader;