import styles from "./artworks.module.scss";

export const renderStatus = (status: string) => {
    switch (status) {
        case "available": {
            return (
                <div className={`${styles.status} ${styles.available}`}>
                    Available
                </div>
            );
        }
        case "inProgress": {
            return (
                <div className={`${styles.status} ${styles.inProgress}`}>
                    In Progress
                </div>
            );
        }
        case "notSelling": {
            return (
                <div className={`${styles.status} ${styles.notSelling}`}>
                    Not Selling
                </div>
            );
        }
    }

    return <div className={`${styles.status}`}>{status}</div>;
};
