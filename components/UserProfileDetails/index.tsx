import { connect } from "react-redux";

import { returnUserRole } from "@/helpers/returnUserRole";
import { Button } from "../UI/Button";
import { ProfileDetailsProps } from "./module.props";
import styles from "./styles.module.scss";
import { formatDate } from "@/helpers/formatDate";

const ProfileDetailsComponent = ({
    user,
    setOpenPopup,
}: ProfileDetailsProps): JSX.Element => {
    if (!user) return <></>;

    return (
        <div
            className={`card card-flush mb-6 mb-xl-9 ${styles.card}`}
            id="personal-info"
        >
            <div className={`card-header ${styles.cardHeader}`}>
                <div className="card-title flex-column">
                    <h2>Profile Details</h2>
                </div>

                <div className="card-toolbar">
                    <Button
                        appearance="blue"
                        className={`btn ${styles.editButton}`}
                        onClick={() => setOpenPopup("editUser")}
                    >
                        Edit Profile
                    </Button>
                </div>
            </div>

            <div className={`card-body ${styles.cardBody}`}>
                <div className={styles.item}>
                    <div className={styles.label}>Full Name</div>
                    <div className={styles.value}>
                        {user.first_name} {user.last_name}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Role</div>
                    <div className={styles.value}>{returnUserRole(user)}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>User ID</div>
                    <div className={styles.value}>{user.id}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Registation Date</div>
                    <div className={styles.value}>
                        {formatDate(user.created_at)}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Username</div>
                    <div className={styles.value}>@{user.username}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Country</div>
                    <div className={styles.value}>{user.country?.title}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Residence Country</div>
                    <div className={styles.value}>
                        {user.residence_country?.title}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Email</div>
                    <div className={styles.value}>{user.email}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>VAT Number</div>
                    <div className={styles.value}>{user.vat_number}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Social Link</div>
                    <div className={styles.value}>{user.social_link}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Bio</div>
                    <div className={styles.value}>{user.description}</div>
                </div>
            </div>
        </div>
    );
};

const mapState = () => ({});
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
};

const connector = connect(mapState, mapDispatch);

export const ProfileDetails = connector(ProfileDetailsComponent);
