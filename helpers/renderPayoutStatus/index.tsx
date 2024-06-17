import { PayoutStateEnum } from "@/submodules/common-dto/api-client/main";
import styles from "./styles.module.scss";

export const renderPayoutStatus = (status: PayoutStateEnum): JSX.Element => {
    switch (status) {
        case PayoutStateEnum.ACCEPTED: {
            return (
                <div className={`${styles.status} ${styles.available}`}>
                    Accepted
                </div>
            );
        }
        case PayoutStateEnum.RELEASED: {
            return (
                <div className={`${styles.status} ${styles.available}`}>
                    Released
                </div>
            );
        }
        case PayoutStateEnum.CREATED: {
            return (
                <div className={`${styles.status} ${styles.created}`}>
                    Created
                </div>
            );
        }
        case PayoutStateEnum.CANCELLED: {
            return (
                <div className={`${styles.status} ${styles.canceled}`}>
                    Canceled
                </div>
            );
        }
        case PayoutStateEnum.REJECTED: {
            return (
                <div className={`${styles.status} ${styles.canceled}`}>
                    Rejected
                </div>
            );
        }
        case PayoutStateEnum.RELEASE_FAILED: {
            return (
                <div className={`${styles.status} ${styles.canceled}`}>
                    Release Failed
                </div>
            );
        }
    }

    return <div className={styles.status}>{status}</div>;
};
