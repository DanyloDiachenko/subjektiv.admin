"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../UI/Button";
import styles from "./styles.module.scss";
import { Switch } from "../UI/Switch";
import { Tooltip } from "../UI/Tootip";
import { UserActionPanelProps } from "./module.props";
import { sliceTitle } from "@/helpers/sliceTitle";
import { getUserImage } from "@/helpers/getUserImage";
import apiClient from "@/api/apiClient";

export const UserActionPanel = ({
    /*  isUserFeaturedArtistProp, */
    /* isUserArtist,
    isUserActiveProp, */
    user,
}: UserActionPanelProps): JSX.Element => {
    const router = useRouter();

    const [isUserFeaturedArtist, setIsUserFeaturedArtist] = useState<boolean>(
        user.is_featured_artist,
    );
    const [isUserActive, setIsUserActive] = useState<boolean>(user.is_active);
    const [isExpertWanted, setIsExpertWanted] = useState<boolean>(
        user.is_expert_wanted,
    );

    const onUserFeaturedArtistChangeHandler = async (isChecked: boolean) => {
        setIsUserFeaturedArtist(isChecked);

        try {
            const response =
                await apiClient.main.adminUser.adminUserControllerUpdateUser({
                    username: user.username,
                    requestBody: {
                        is_featured_artist: !isUserFeaturedArtist,
                    },
                });

            console.log(response);
        } catch (error) {
            console.log("error in update user", error);
        }
    };

    const onUserActiveChangeHandler = async (isChecked: boolean) => {
        setIsUserActive(isChecked);

        try {
            const response =
                await apiClient.main.adminUser.adminUserControllerUpdateUser({
                    username: user.username,
                    requestBody: {
                        is_active: !isUserActive,
                    },
                });

            console.log(response);
        } catch (error) {
            console.log("error in update user", error);
        }
    };

    const submitExpertWanted = async (type: "decline" | "approve") => {
        try {
            await apiClient.main.adminUser.adminUserControllerUpdateUser({
                username: user.username,
                requestBody: {
                    is_expert: type === "approve" ? true : false,
                },
            });

            setIsExpertWanted(false);

            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`card mb-5 mb-xl-8 ${styles.card}`}>
            <div className={`card-header border-0 ${styles.cardHeader}`}>
                <div className="card-title">
                    <h3 className="fw-bold m-0">Action Panel</h3>
                </div>
            </div>
            <div className={`card-body ${styles.cardBody}`}>
                {isExpertWanted && (
                    <div className={styles.notification}>
                        <div className={styles.title}>
                            <img
                                src={getUserImage(user.avatar_id)}
                                alt="avatar"
                                className={styles.avatar}
                            />
                            <span>
                                {sliceTitle(user.first_name || "", 6)}{" "}
                                {sliceTitle(user.last_name || "", 6)} would like
                                to become an expert.
                            </span>
                        </div>
                        <p>
                            “I would like to become an expert, please consider
                            my candidacy.”
                        </p>
                        <div className={styles.buttons}>
                            <Button
                                className={styles.decline}
                                appearance="blue"
                                onClick={() => submitExpertWanted("decline")}
                            >
                                Decline
                            </Button>
                            <Button
                                className={styles.approve}
                                appearance="blue"
                                onClick={() => submitExpertWanted("approve")}
                            >
                                Approve
                            </Button>
                        </div>
                    </div>
                )}
                <div className={styles.settings}>
                    <div className={styles.item}>
                        <div className={styles.leftColumn}>
                            <Image
                                src="/media/no-avatar.png"
                                alt="user"
                                width="24"
                                height="24"
                                style={{
                                    background: "#393945",
                                    borderRadius: "50%",
                                }}
                            />
                            <div className={styles.title}>Account Access</div>
                        </div>
                        <Switch
                            isChecked={isUserActive}
                            onChange={onUserActiveChangeHandler}
                        />
                    </div>
                    {user.is_artist && (
                        <div className={styles.item}>
                            <div className={styles.leftColumn}>
                                <Image
                                    src="/media/no-avatar.png"
                                    alt="user"
                                    width="24"
                                    height="24"
                                    style={{
                                        background: "#393945",
                                        borderRadius: "50%",
                                    }}
                                />
                                <div className={styles.title}>
                                    Is Featured Artist
                                </div>
                            </div>
                            <Switch
                                isChecked={isUserFeaturedArtist}
                                onChange={onUserFeaturedArtistChangeHandler}
                            />
                        </div>
                    )}
                    <div className={styles.item}>
                        <div className={styles.leftColumn}>
                            <Image
                                src="/media/lock.svg"
                                alt="user"
                                width="24"
                                height="24"
                            />
                            <div className={styles.title}>Reset Password</div>
                        </div>
                        <Button
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-reset"
                            className={styles.button}
                            appearance="grey"
                        >
                            Reset
                        </Button>
                        <Tooltip id="tooltip-reset" />
                    </div>
                    <div className={styles.item}>
                        <div className={styles.leftColumn}>
                            <Image
                                src="/media/shield.svg"
                                alt="user"
                                width="24"
                                height="24"
                            />
                            <div className={styles.title}>Delete Account</div>
                        </div>
                        <Button
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-delete"
                            className={styles.button}
                            appearance="red"
                        >
                            Delete
                        </Button>
                        <Tooltip id="tooltip-delete" />
                    </div>
                    <div className={styles.item}>
                        <div className={styles.leftColumn}>
                            <Image
                                src="/media/notification.svg"
                                alt="user"
                                width="24"
                                height="24"
                            />
                            <div className={styles.title}>
                                Send a Email Message
                            </div>
                        </div>
                        <Button
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-send"
                            className={styles.button}
                            appearance="grey"
                        >
                            Send
                        </Button>
                        <Tooltip id="tooltip-send" />
                    </div>
                </div>
            </div>
        </div>
    );
};
