"use client";

import styles from "./styles.module.scss";
import { Select } from "../UI/Select";
import { UserListSelectorsProps } from "./module.props";

export const UserListSelectors = ({
    role,
    roleVariants,
    setRole,
    accountStatus,
    accountStatusVariants,
    setAccountStatus,
    location,
    locationVariants,
    setLocation,
    verificationStatus,
    verificationStatusVariants,
    setVerificationStatus,
    pageType,
    isUserExpert,
    isUserExpertVariants,
    setIsUserExpert,
}: UserListSelectorsProps): JSX.Element => {
    return (
        <div className={`card-toolbar ${styles.cardToolbal}`}>
            <div className={`${styles.wrapper}`}>
                {pageType === "expertWantedUsers" ? (
                    <Select
                        placeholder="Is User Expert"
                        activeVariant={isUserExpert}
                        setActiveVariant={setIsUserExpert}
                        variants={isUserExpertVariants}
                        className={styles.isUserExpertSelect}
                    />
                ) : (
                    <>
                        <Select
                            placeholder="Role"
                            activeVariant={role}
                            setActiveVariant={setRole}
                            variants={roleVariants}
                            className={styles.role}
                        />
                        <Select
                            placeholder="Account Status"
                            activeVariant={accountStatus}
                            setActiveVariant={setAccountStatus}
                            variants={accountStatusVariants}
                            className={styles.accountStatus}
                        />
                        <Select
                            placeholder="Verification"
                            activeVariant={verificationStatus}
                            setActiveVariant={setVerificationStatus}
                            variants={verificationStatusVariants}
                            className={styles.verification}
                        />
                        <Select
                            placeholder="Location"
                            activeVariant={location}
                            setActiveVariant={setLocation}
                            variants={locationVariants}
                            className={styles.location}
                        />
                    </>
                )}
                {/* <Button
                    appearance="blue"
                    className={styles.newUserButton}
                    data-tooltip-content="Currently doesn`t work"
                    data-tooltip-id="tooltip-newUser"
                >
                    <Tooltip id="tooltip-newUser" />
                    <span className={styles.plus}>
                        <Image
                            src="/media/plus.svg"
                            alt="plus"
                            width="18"
                            height="18"
                        />
                    </span>
                    <span>New User</span>
                </Button> */}
            </div>
        </div>
    );
};
