import { UserVerificationStatus } from "@/submodules/common-dto/api-client/main/models/UserVerificationStatus";
import styles from "./styles.module.scss";

export const renderVerificationStatus = (status: string): JSX.Element => {
    switch (status) {
        case UserVerificationStatus.NOT_VERIFIED: {
            return (
                <div className={`${styles.status} ${styles.notVerified}`}>
                    Not verified
                </div>
            );
        }
        case UserVerificationStatus.IN_PROGRESS: {
            return (
                <div className={`${styles.status} ${styles.verifying}`}>
                    Verifying
                </div>
            );
        }
        case UserVerificationStatus.VERIFIED: {
            return (
                <div className={`${styles.status} ${styles.verified}`}>
                    Verified
                </div>
            );
        }

        case UserVerificationStatus.VERIFICATION_FAILED: {
            return (
                <div className={`${styles.status} ${styles.faild}`}>
                    Verification failed
                </div>
            );
        }
    }

    return <div className={styles.status}>{status}</div>;
};
