import {
    PaymentOperatorEnum,
    UserVerificationStatus,
} from "@/submodules/common-dto/api-client/main";
import { PayoutVerificationProps } from "./module.props";
import styles from "./styles.module.scss";
import { IPayoutInfoStore } from "@/store/payoutInfo/initStore";
import { connect } from "react-redux";
import { Button } from "@/components/UI/Button";
import { Select } from "@/components/UI/Select";

const failureReasons = [
    {
        id: 1,
        value: "incorrect_info",
        label: "Payment information is incorrect",
    },
    {
        id: 2,
        value: "suspicious_info",
        label: "Payment information is suspicious",
    },
];

const PayoutVerificationComponent = ({
    user,
    contentType,
    setOpenPopup,
    setPayoutInfo,
    verificationStatus,
    setVerificationStatus,
    verificationStatuses,
    verificationFailedReason,
    setVerificationFailedReason,
}: PayoutVerificationProps) => {
    const onEditButtonClick = () => {
        setOpenPopup("editPayoutInfo");
        setPayoutInfo({
            currency: user.currency,
            iban: user.iban,
            swift: user.swift,
            username: user.username,
        });
    };

    return (
        <>
            {user.payment_operator === PaymentOperatorEnum.MANUAL && (
                <div
                    className={`card card-flush mb-6 mb-xl-9 ${styles.card}`}
                    id="payout-information"
                >
                    <div className={`card-header ${styles.cardHeader}`}>
                        <div className="card-title flex-column">
                            <h2>Payout Information</h2>
                        </div>
                        <div className="card-toolbar">
                            {contentType === "oneUser" && (
                                <Button
                                    appearance="blue"
                                    className={`btn ${styles.editButton}`}
                                    onClick={onEditButtonClick}
                                >
                                    Edit Info
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className={`card-body ${styles.cardBody}`}>
                        <div>
                            <div className={styles.item}>
                                <div className={styles.label}>Currency</div>
                                <div className={styles.value}>
                                    {user.currency}
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.label}>IBAN</div>
                                <div className={styles.value}>{user.iban}</div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.label}>Swift</div>
                                <div className={styles.value}>{user.swift}</div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.label}>
                                    Payment First Name
                                </div>
                                <div className={styles.value}>
                                    {user.payment_first_name}
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.label}>
                                    Payment Last Name
                                </div>
                                <div className={styles.value}>
                                    {user.payment_last_name}
                                </div>
                            </div>

                            <>
                                {contentType === "verifyUser" && (
                                    <>
                                        <div className={styles.item}>
                                            <div className={styles.label}>
                                                Verification Status
                                            </div>
                                            <div className={styles.value}>
                                                <div
                                                    className={
                                                        styles.selectWrapper
                                                    }
                                                >
                                                    <Select
                                                        activeVariant={
                                                            verificationStatus
                                                        }
                                                        setActiveVariant={
                                                            setVerificationStatus
                                                        }
                                                        variants={
                                                            verificationStatuses
                                                        }
                                                        placeholder=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {verificationStatus?.value ===
                                            UserVerificationStatus.VERIFICATION_FAILED && (
                                            <div className={styles.item}>
                                                <div className={styles.label}>
                                                    Fail Reason
                                                </div>
                                                <div className={styles.value}>
                                                    {failureReasons.map(
                                                        (reason) => (
                                                            <label
                                                                key={reason.id}
                                                                className={
                                                                    styles.failReason
                                                                }
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="failReason"
                                                                    value={
                                                                        reason.value
                                                                    }
                                                                    onChange={() =>
                                                                        setVerificationFailedReason(
                                                                            reason.value,
                                                                        )
                                                                    }
                                                                    checked={
                                                                        verificationFailedReason ===
                                                                        reason.value
                                                                    }
                                                                />
                                                                <span>
                                                                    {
                                                                        reason.label
                                                                    }
                                                                </span>
                                                            </label>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const mapState = () => ({});
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
    setPayoutInfo: (payoutInfo: IPayoutInfoStore) => ({
        type: "SET_PAYOUT_INFO",
        payoutInfo,
    }),
};

const connector = connect(mapState, mapDispatch);

export const PayoutVerification = connector(PayoutVerificationComponent);
