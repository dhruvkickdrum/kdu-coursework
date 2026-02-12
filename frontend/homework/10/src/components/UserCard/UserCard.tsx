import type { User } from "../../types";
import { Link } from "react-router-dom";
import styles from './UserCard.module.scss';

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Link to={`/users/${user.id}`} className={styles.cardLink}>
      <article className={styles.userCard}>
        <div className={styles.imageContainer}>
          <img
            src={user.image}
            alt={fullName}
            className={styles.userImage}
            loading="lazy"
          />
        </div>

        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{fullName}</h3>
          
          <div className={styles.userDetail}>
            <span className={styles.detailText}>{user.email}</span>
          </div>

          <div className={styles.userDetail}>
            <span className={styles.detailText}>{user.phone}</span>
          </div>

          <div className={styles.userDetail}>
            <span className={styles.detailText}>{user.age} years old</span>
          </div>
        </div>

        <div className={styles.viewButton}>
          View Details
        </div>
      </article>
    </Link>
  );
};

export  default UserCard;
