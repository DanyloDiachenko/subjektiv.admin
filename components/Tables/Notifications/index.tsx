"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { AdminNotificationItemDto } from "@/submodules/common-dto/api-client/main";
import { sliceTitle } from "@/helpers/sliceTitle";
import Pagination from "@/components/UI/Pagination";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import apiClient from "@/api/apiClient";
import { QuantitySelector } from "@/components/UI/QuantitySelector";
import { NothingFound } from "@/components/NothingFound";
import { NotificationsTableProps } from "./module.props";
import { getFormattedNotificationType } from "@/helpers/returnNotificationType";
import { Tooltip } from "@/components/UI/Tootip";
import { TotalItems } from "@/components/UI/TotalItems";

const notificationQuantityPerPageVariants: ISelectVariant[] = [
    {
        title: "10",
        value: "10",
    },
    {
        title: "20",
        value: "20",
    },
    {
        title: "50",
        value: "50",
    },
    {
        title: "100",
        value: "100",
    },
];

export const NotificationsTable = ({
    notificationsResponse,
}: NotificationsTableProps): JSX.Element => {
    const [notificationQuantityPerPage, setNotificationQuantityPerPage] =
        useState<ISelectVariant>(notificationQuantityPerPageVariants[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(
        notificationsResponse.total_pages,
    );
    const [total, setTotal] = useState(notificationsResponse.total);
    const [notifications, setNotifications] = useState<
        AdminNotificationItemDto[]
    >(notificationsResponse.items);

    const getNotifications = async () => {
        try {
            const response =
                await apiClient.main.adminNotification.adminNotificationControllerGetList(
                    {
                        page: currentPage,
                    },
                );

            setNotifications(response.items);
            setTotalPages(response.total_pages);
            setTotal(response.total);
        } catch (error) {
            console.log("error getting notifications", error);
        }
    };

    useEffect(() => {
        getNotifications();
    }, [currentPage]);

    return (
        <>
            <div className={`card-body py-4 ${styles.table}`}>
                <div className={styles.tableHeader}>
                    <TotalItems number={total} />
                </div>
                <table
                    className={`table align-middle table-row-dashed fs-6 gy-5`}
                >
                    <thead>
                        <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th className={styles.thId}>NOTIFICATION ID</th>
                            <td className={styles.thTitle}>TITLE</td>
                            <td className={styles.thText}>TEXT</td>
                            <td className={styles.thType}>TYPE</td>
                            <th className={styles.thUser}>USER</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                        {notifications.length
                            ? notifications.map((notification, index) => (
                                  <tr key={index}>
                                      <td>
                                          <Link
                                              href={
                                                  "/notifications/" +
                                                  notification.id
                                              }
                                              className={styles.linkTitle}
                                          >
                                              {notification.id}
                                          </Link>
                                      </td>
                                      <td>
                                          <Link
                                              href={
                                                  "/notifications/" +
                                                  notification.id
                                              }
                                              className={styles.linkTitle}
                                          >
                                              {sliceTitle(
                                                  notification.title,
                                                  30,
                                              )}
                                          </Link>
                                      </td>
                                      <td>
                                          {sliceTitle(notification.title, 50)}
                                      </td>
                                      <td>
                                          {getFormattedNotificationType(
                                              notification.type,
                                          )}
                                      </td>
                                      <td>
                                          <Link
                                              className={`${styles.author} ${styles.linkTitle}`}
                                              href={
                                                  "/users/" +
                                                  notification.user_id
                                              }
                                          >
                                              {notification.user_id}
                                          </Link>
                                          {/* <Link
                                              className={`${styles.author} ${styles.linkTitle}`}
                                              href={
                                                  "/users/" +
                                                  notification.user.id
                                              }
                                          >
                                              <Image
                                                  src={getUserImage(
                                                      notification.user
                                                          .avatar_id
                                                  )}
                                                  alt="user"
                                                  width={50}
                                                  height={50}
                                              />
                                              <span
                                                  className={
                                                      styles.titleAvailable
                                                  }
                                              >
                                                  {sliceTitle(
                                                      notification.user
                                                          .first_name || "",
                                                      10
                                                  )}{" "}
                                                  {sliceTitle(
                                                      notification.user
                                                          .last_name || "",
                                                      10
                                                  )}
                                              </span>
                                          </Link> */}
                                      </td>
                                  </tr>
                              ))
                            : ""}
                    </tbody>
                </table>
            </div>
            {!notifications.length && <NothingFound />}
            <div className={styles.bottomContent}>
                <div>
                    <Tooltip id="pagination-tooltip" />
                    <div
                        data-tooltip-content="Currently doesn`t work"
                        data-tooltip-id="pagination-tooltip"
                    >
                        <QuantitySelector
                            quantityPerPage={notificationQuantityPerPage}
                            setQuantityPerPage={setNotificationQuantityPerPage}
                            quantityPerPageVariants={
                                notificationQuantityPerPageVariants
                            }
                        />
                    </div>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
};
