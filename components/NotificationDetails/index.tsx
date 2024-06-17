"use client";

import Link from "next/link";
import { useState } from "react";

import styles from "./styles.module.scss";
import { NotificationDetailsProps } from "./module.props";
import { formatDate } from "@/helpers/formatDate";
import apiClient from "@/api/apiClient";
import { Switch } from "../UI/Switch";
import { getFormattedNotificationType } from "@/helpers/returnNotificationType";

export const NotificationDetails = ({
    notification,
}: NotificationDetailsProps) => {
    const [isNotificationSolved, setIsNotificationSolved] = useState<boolean>(
        notification.is_solved,
    );

    const onNotificationSolvedChange = (isChecked: boolean) => {
        setIsNotificationSolved(isChecked);

        try {
            apiClient.main.adminNotification.adminNotificationControllerUpdate({
                id: notification.id,
                isSolved: isChecked,
            });
        } catch (error) {
            console.log(error);
        }
    };

    console.log(notification);

    return (
        <div className={`card card-flush mb-6 mb-xl-9 ${styles.card}`}>
            <div className={`card-header ${styles.cardHeader}`}>
                <div className="card-title flex-column">
                    <h2>Details</h2>
                </div>
            </div>
            <div className={`card-body ${styles.cardBody}`}>
                <div className={styles.item}>
                    <div className={styles.label}>Notifcation ID</div>
                    <div className={styles.value}>{notification.id}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Title</div>
                    <div className={styles.value}>{notification.title}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>User ID</div>
                    <div className={styles.value}>
                        <Link
                            href={"/users/" + notification.user_id}
                            className={styles.linkTitle}
                        >
                            {notification.user_id}
                        </Link>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Text</div>
                    <div className={styles.value}>{notification.text}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Type</div>
                    <div className={styles.value}>
                        {getFormattedNotificationType(notification.type)}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Is Read</div>
                    <div className={styles.value}>
                        {notification.is_read ? "Read" : "Not Read"}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Is Solved</div>
                    <div className={styles.value}>
                        <Switch
                            isChecked={isNotificationSolved}
                            onChange={onNotificationSolvedChange}
                        />
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Created At</div>
                    <div className={styles.value}>
                        {formatDate(notification.created_at)}
                    </div>
                </div>
            </div>
        </div>
    );
};
