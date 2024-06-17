"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import styles from "./users.module.scss";
import { returnUserRole } from "@/helpers/returnUserRole";
import { returnIsUserActive } from "@/helpers/returnIsUserActive";
import { formatDate } from "@/helpers/formatDate";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import imageService from "@/api/imageService";
import { QuantitySelector } from "@/components/UI/QuantitySelector";
import Pagination from "@/components/UI/Pagination";
import { UsersTableProps } from "./module.props";
import { sliceTitle } from "@/helpers/sliceTitle";
import { Tooltip } from "@/components/UI/Tootip";
import { NothingFound } from "@/components/NothingFound";
import {
    AdminUserSortingFields,
    SortOrder,
} from "@/submodules/common-dto/api-client/main";

export const UsersTable = ({
    users,
    usersQuantityPerPageVariants,
    usersQuantityPerPage,
    setUserQuantityPerPage,
    totalPages,
    setCurrentPage,
    currentPage,
    onThClick,
}: UsersTableProps): JSX.Element => {
    const [isShortEmil, setIsShortEmail] = useState<boolean>(true);

    const returnEmail = (email: string) => {
        if (isShortEmil) {
            return sliceTitle(email, 25);
        } else {
            return email;
        }
    };

    const getUserImage = (userAvatarId: string | null): string => {
        if (userAvatarId) {
            return imageService.getUrl(
                ImageTargetEnum.UserAvatar,
                null,
                userAvatarId,
                "small",
            );
        }

        return "/media/no-avatar.png";
    };

    const isVerifyUsersPage = usePathname().includes("verify-users");

    return (
        <>
            <div className={`card-body py-4 ${styles.table}`}>
                <table
                    className={`table align-middle table-row-dashed fs-6 gy-5`}
                >
                    <thead>
                        <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th className={styles.thUserId}>USER ID</th>
                            <th className={styles.thUserUser}>
                                <div className={styles.arrowContent}>
                                    USER
                                    <div className={styles.arrows}>
                                        <img
                                            src="/media/arrow-top.svg"
                                            alt="sort"
                                            onClick={() =>
                                                onThClick(
                                                    AdminUserSortingFields.FIRST_NAME,
                                                    SortOrder.ASC,
                                                )
                                            }
                                        />
                                        <img
                                            src="/media/arrow-top.svg"
                                            alt="sort"
                                            style={{
                                                transform: "rotate(180deg)",
                                            }}
                                            onClick={() =>
                                                onThClick(
                                                    AdminUserSortingFields.FIRST_NAME,
                                                    SortOrder.DESC,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </th>
                            <th className={styles.thUserName}>USER NAME</th>
                            <th className={styles.thUserEmail}>EMAIL</th>
                            <th className={styles.thUserRole}>ROLE</th>
                            <th className={styles.thUserAccountStatus}>
                                ACCOUNT STATUS
                            </th>
                            <th className={styles.thUserLocation}>LOCATION</th>
                            <th className={styles.thUserRegister}>
                                DATE REGISTRATION
                            </th>
                        </tr>
                    </thead>
                    {users.length ? (
                        <tbody className="text-gray-600 fw-semibold">
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link
                                            href={`/${
                                                isVerifyUsersPage
                                                    ? "verify-users"
                                                    : "users"
                                            }/${user.id}`}
                                            className={styles.linkTitle}
                                        >
                                            {sliceTitle(user.id, 8)}
                                        </Link>
                                    </td>
                                    <td
                                        className={`d-flex align-items-center ${styles.avatarNameTd}`}
                                    >
                                        <Link
                                            href={`/${
                                                isVerifyUsersPage
                                                    ? "verify-users"
                                                    : "users"
                                            }/${user.id}`}
                                            className="symbol symbol-circle symbol-50px overflow-hidden me-3"
                                        >
                                            <div
                                                className={`symbol-label ${styles.avatar}`}
                                            >
                                                <img
                                                    src={getUserImage(
                                                        user.avatar_id,
                                                    )}
                                                    alt="user`s avatar"
                                                    style={{
                                                        background: "#393945",
                                                    }}
                                                />
                                            </div>
                                        </Link>

                                        <div className="d-flex">
                                            <Link
                                                href={`/${
                                                    isVerifyUsersPage
                                                        ? "verify-users"
                                                        : "users"
                                                }/${user.id}`}
                                                className={styles.linkTitle}
                                            >
                                                {sliceTitle(
                                                    user.first_name || "",
                                                    25,
                                                )}{" "}
                                                {sliceTitle(
                                                    user.last_name || "",
                                                    25,
                                                )}
                                            </Link>
                                        </div>
                                    </td>
                                    <td>@{user.username}</td>
                                    <td>
                                        <span
                                            onClick={() =>
                                                setIsShortEmail(!isShortEmil)
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            {returnEmail(user.email)}
                                        </span>
                                    </td>
                                    <td>{returnUserRole(user)}</td>
                                    <td>
                                        <span
                                            className={`${
                                                styles.accountStatus
                                            } ${
                                                user.is_active
                                                    ? styles.active
                                                    : styles.blocked
                                            }`}
                                        >
                                            {returnIsUserActive(user.is_active)}
                                        </span>
                                    </td>
                                    <td>{user.country?.title}</td>
                                    <td>{formatDate(user.created_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        ""
                    )}
                </table>
            </div>
            {!users.length && <NothingFound />}

            <div className={styles.bottomContent}>
                <div>
                    <Tooltip id="tooltip-pagintaion" />
                    <div
                        data-tooltip-content="Currently doesn`t work"
                        data-tooltip-id="tooltip-pagintaion"
                    >
                        <QuantitySelector
                            quantityPerPage={usersQuantityPerPage}
                            setQuantityPerPage={setUserQuantityPerPage}
                            quantityPerPageVariants={
                                usersQuantityPerPageVariants
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
