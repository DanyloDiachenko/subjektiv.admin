import { PaymentStateEnum } from "../../submodules/common-dto/api-client/main/models/PaymentStateEnum";
import styles from "./styles.module.scss";

export const renderPaymentStatus = (status: PaymentStateEnum): JSX.Element => {
    switch (status) {
        case PaymentStateEnum.CANCELLED: {
            return (
                <div className={`${styles.status} ${styles.canceled}`}>
                    Canceled
                </div>
            );
        }
        case PaymentStateEnum.COMPLETED: {
            return (
                <div className={`${styles.status} ${styles.completed}`}>
                    Completed
                </div>
            );
        }
        case PaymentStateEnum.CREATED: {
            return (
                <div className={`${styles.status} ${styles.created}`}>
                    Created
                </div>
            );
        }
        case PaymentStateEnum.PAID: {
            return (
                <div className={`${styles.status} ${styles.paid}`}>Paid</div>
            );
        }
    }

    return <div className={styles.status}>{status}</div>;
};
