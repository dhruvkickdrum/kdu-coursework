import type { FC } from "react";
import styles from './Header.module.scss';
const Header: FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <h1 className={styles.header_logo}>Cleanly</h1>
                <a href="tel:800-710-8420" className={styles.header_phone}>800-710-8420</a>
            </div>
        </header>
    );
};
export default Header;