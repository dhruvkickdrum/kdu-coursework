import type { RegistrationStatusTypes } from "../../types";
import styles from './StatusBadge.module.scss';

interface StatusBadgeProps {
  status: RegistrationStatusTypes;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    if (!status) {
        return null;
    }

    const statusClassMap: Record<Exclude<RegistrationStatusTypes, null>, string> = {
        Queued: styles.queued,
        Confirmed: styles.confirmed,
        Failed: styles.failed,
    };

    return <span className={`${styles.badge} ${statusClassMap[status]}`}>{status}</span>
}

export default StatusBadge;