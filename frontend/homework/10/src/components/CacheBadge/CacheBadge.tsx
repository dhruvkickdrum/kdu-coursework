import type { FC } from 'react';
import styles from './CacheBadge.module.scss';

interface CacheBadgeProps {
  isCached: boolean;
}

const CacheBadge: FC<CacheBadgeProps> = ({ isCached }) => {
  return (
    <div className={`${styles.badge} ${isCached ? styles.cached : styles.fresh}`}>
      <span className={styles.text}>
        {isCached ? 'Using cached data' : 'Freshly fetched'}
      </span>
    </div>
  );
};

export default CacheBadge;
