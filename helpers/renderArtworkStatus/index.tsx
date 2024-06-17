import styles from "./styles.module.scss";

export const renderArtworkStatus = (status: string): JSX.Element => {
    switch (status) {
        case "available": {
            return (
                <div className={`${styles.status} ${styles.available}`}>
                    Available
                </div>
            );
        }
        case "sold": {
            return (
                <div className={`${styles.status} ${styles.sold}`}>Sold</div>
            );
        }
        case "inProgress": {
            return (
                <div className={`${styles.status} ${styles.inProgress}`}>
                    In Progress
                </div>
            );
        }
        case "delivery": {
            return (
                <div className={`${styles.status} ${styles.delivery}`}>
                    Delivery
                </div>
            );
        }
        case "notSelling": {
            return (
                <div className={`${styles.status} ${styles.notSelling}`}>
                    Not selling
                </div>
            );
        }
    }

    return <div className={styles.status}>{status}</div>;
};
