import type { FC } from "react";
import { useGetUsersQuery } from "../../api";
import styles from "./UserDirectory.module.scss";
import ErrorState from "../../components/ErrorBoundary/ErrorState";
import Loader from "../../components/Loader";
import UserForm from "../../components/UserForm/UserForm";
import UserCard from "../../components/UserCard";

const UserDirectory: FC = () => {
    const { data, isLoading, isError, isFetching } = useGetUsersQuery();

    if(isLoading) {
        return <Loader fullscreen message="Loading Users...." />
    }
    if(isError) {
        return (
            <ErrorState
                message={"An Unexpected error occurred. Please try again"}
                actionLabel="Reload"
                onAction={() => globalThis.location.reload()}
            />
        )
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>User Directory</h1>
                    <p className={styles.subtitle}>Profiles</p>
                    {data && (
                        <div className={styles.userCount}>
                            <span className={styles.countBadge}>{data.total} {data.total === 1 ? "User" : "Users"}</span>
                            {isFetching && (
                                <span className={styles.refreshingBadge}>Refreshing...</span>
                            )}
                        </div>
                    )}
                </div>
            </header>

            <div className={styles.content}>
                <section className={styles.formSection}>
                    <UserForm />
                </section>
                <section className={styles.userSection}>
                    <h2 className={styles.sectionTitle}>All Users</h2>
                    {data && data.users.length > 0 ? (
                        <div className={styles.userGrid}>
                            {data.users.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <h3 className={styles.emptyTitle}>No Users found</h3>
                            <p className={styles.emptyMessage}>Start by adding a new user using the form above.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default UserDirectory;
