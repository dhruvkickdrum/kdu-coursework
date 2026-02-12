import { useEffect, useRef, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../api";
import styles from './UserDetails.module.scss';
import Loader from "../../components/Loader";
import ErrorState from "../../components/ErrorBoundary/ErrorState";
import CacheBadge from "../../components/CacheBadge";
const UserDetails: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const userId = Number(id);

    const isFirstRender = useRef(true);
    const [wasCached, setWasCached] = useState(false);

    const { data: user, isLoading, isError, isFetching } = useGetUserByIdQuery(userId, { skip: !userId || Number.isNaN(userId) });

    useEffect(() => {
        if (isFirstRender.current) {
            setWasCached(Boolean(user) && !isLoading);
            isFirstRender.current = false;
        }
    }, [user, isLoading]);

    if (!userId || Number.isNaN(userId)) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorContent}>
                    <h2 className={styles.errorTitle}>Invalid userId</h2>
                    <button className={styles.backButtin} onClick={() => navigate('/')}>Back</button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return <Loader fullscreen message="Loading User details" />
    }

    if (isError) {
        return (
            <ErrorState
                message={"An Unexpected error occurred. Please try again"}
                actionLabel="Reload"
                onAction={() => globalThis.location.reload()}
            />
        )
    }

    if(!user) return null;

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={() => navigate('/')}>Back</button>
                    <div className={styles.headerRight}>
                        <CacheBadge isCached={wasCached && !isFetching} />
                        {isFetching && (
                            <span className={styles.fetchingBadge}>Updating...</span>
                        )}
                    </div>
                </div>

                <div className={styles.profileCard}>
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img
                src={user.image}
                alt={fullName}
                className={styles.userImage}
              />
            </div>
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.userName}>{fullName}</h1>
                        

            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Contact Information</h3>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoText}>
                      <span className={styles.infoLabel}>Email</span>
                      <a className={styles.infoValue}>
                        {user.email}
                      </a>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoText}>
                      <span className={styles.infoLabel}>Phone</span>
                      <a href={`tel:${user.phone}`} className={styles.infoValue}>
                        {user.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Personal Information</h3>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoText}>
                      <span className={styles.infoLabel}>Age</span>
                      <span className={styles.infoValue}>{user.age} years old</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
            </div>
        </div>
    )
}

export default UserDetails;
