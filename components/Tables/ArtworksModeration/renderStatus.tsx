import { ArtworkAdminItemDto } from "@/submodules/common-dto/api-client/main";
import styles from "./artworks.module.scss";

export const renderStatus = (artwork: ArtworkAdminItemDto) => {
    if (artwork.is_moderated && !artwork.is_public && !artwork.is_published) {
        return (
            <div className={`${styles.status} ${styles.rejected}`}>
                Rejected
            </div>
        );
    }
    if (artwork.is_moderated && artwork.is_public && artwork.is_published) {
        return (
            <div className={`${styles.status} ${styles.approved}`}>
                Approved
            </div>
        );
    }
    if (artwork.is_moderated && !artwork.is_public && artwork.is_published) {
        return (
            <div className={`${styles.status} ${styles.notPublic}`}>
                Not public
            </div>
        );
    }
    if (!artwork.is_moderated) {
        return (
            <div className={`${styles.status} ${styles.pending}`}>Pending</div>
        );
    }

    return <div className={`${styles.status}`}>Status</div>;
};
