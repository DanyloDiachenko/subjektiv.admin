import styles from "./styles.module.scss";

export const renderOrderStatus = (status: string): JSX.Element => {
    switch (status) {
        case "pending": {
            return (
                <div className={`${styles.status} ${styles.pending}`}>New</div>
            );
        }
        case "paid": {
            return (
                <div className={`${styles.status} ${styles.placed}`}>
                    Order placed
                </div>
            );
        }
        case "delivering": {
            return (
                <div className={`${styles.status} ${styles.delivering}`}>
                    Delivering
                </div>
            );
        }

        case "canceled": {
            return (
                <div className={`${styles.status} ${styles.canceled}`}>
                    Canceled
                </div>
            );
        }
        case "completed": {
            return (
                <div className={`${styles.status} ${styles.successful}`}>
                    Completed
                </div>
            );
        }
        case "payouts_proceed": {
            return (
                <div className={`${styles.status} ${styles.proceed}`}>
                    Payouts proceed
                </div>
            );
        }
    }

    return <div className={styles.status}>{status}</div>;
};
