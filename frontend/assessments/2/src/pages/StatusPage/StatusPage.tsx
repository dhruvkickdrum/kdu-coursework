import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { fetchRegistrationStatus } from "../../features/status/statusThunks";
import Loader from "../../components/Loader/Loader";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import styles from './StatusPage.module.scss';


const StatusPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { status, loading, registrationId, name, email, event } = useAppSelector((state) => state.status);

  useEffect(() => {
    if (!id) {
      return;
    }

    if(status == 'Confirmed' || status == 'Failed') {
      return;
    }

    dispatch(fetchRegistrationStatus(id));

    const intervalId = setInterval(() => {
      dispatch(fetchRegistrationStatus(id));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch, id]);

  const hasData = Boolean(status || registrationId || name || email || event);

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Status Page</h2>

      <section className={styles.banner}>Registration Status</section>

      {loading && !hasData && <Loader message="Checking your registration..." />}

      {hasData && (
        <article className={styles.card}>
          <h3 className={styles.registrationId}>Registration ID: {registrationId}</h3>

          <div className={styles.details}>
            <p><span className={styles.label}>Name:</span> {name ?? "-"}</p>
            <p><span className={styles.label}>Email:</span> {email ?? "-"}</p>
            <p><span className={styles.label}>Event:</span> {event ?? "-"}</p>
          </div>

          <div className={styles.statusRow}>
            <span className={styles.statusTitle}>Status:</span>
            <StatusBadge status={status} />
          </div>
        </article>
      )}

      <div className={styles.checking}>
        <span className={`${styles.dot} ${styles.dotOne}`}></span>
        <span className={`${styles.dot} ${styles.dotTwo}`}></span>
        <span className={`${styles.dot} ${styles.dotThree}`}></span>
        <p>Checking status...</p>
      </div>
    </div>
  );
};

export default StatusPage;