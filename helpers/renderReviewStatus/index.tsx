import { ArtworkReviewStatus } from "@/submodules/common-dto/api-client/main";
import styles from "./styles.module.scss";

export const renderReviewStatus = (
    status: ArtworkReviewStatus,
): JSX.Element => {
    switch (status) {
        case ArtworkReviewStatus.PUBLISHED: {
            return (
                <div className={`${styles.status} ${styles.published}`}>
                    Published
                </div>
            );
        }
        case ArtworkReviewStatus.IN_PROGRESS: {
            return (
                <div className={`${styles.status} ${styles.wait}`}>
                    Wait Answer
                </div>
            );
        }
    }

    return <div className={styles.status}>{status}</div>;
};
