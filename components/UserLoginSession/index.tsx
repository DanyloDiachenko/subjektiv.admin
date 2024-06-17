"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { Button } from "../UI/Button";
import { QuantitySelector } from "../UI/QuantitySelector";
import { ISelectVariant } from "../UI/Select/variant.interface";
import Pagination from "../UI/Pagination";

import { Tooltip } from "../UI/Tootip";
import apiClient from "@/api/apiClient";
import { UserStudioProps } from "./module.props";
import { UserLoginSessionTable } from "../Tables/UserLoginSession";
import { NotRecordsYet } from "../NotRecordsYet";
import { LoginEventDto } from "@/submodules/common-dto/api-client/auth";

export const UserLoginSession = ({
    userEmail,
}: UserStudioProps): JSX.Element => {
    const usersQuantityPerPageVariants: ISelectVariant[] = [
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

    const [loginSessions, setLoginSessions] = useState<LoginEventDto[]>([]);
    const [usersQuantityPerPage, setUserQuantityPerPage] =
        useState<ISelectVariant>(usersQuantityPerPageVariants[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isContentOpened, setIsContentOpened] = useState<boolean>(true);

    const getLoginSession = async () => {
        await apiClient.auth.auth
            .authControllerGetLoginEvents({
                email: userEmail,
                page: currentPage,
            })
            .then((response) => {
                setLoginSessions(response.items);
                setTotalPages(response.total_pages);
            });
    };

    useEffect(() => {
        getLoginSession();
    }, [currentPage]);

    return (
        <div className={styles.card} id="loginSessions">
            <div className={styles.cardHeader}>
                <div className={styles.leftColumn}>
                    <h2>Login sessions</h2>
                    <Image
                        src="/media/arrow-top.svg"
                        alt="arrow"
                        width="20"
                        height="21"
                        className={!isContentOpened ? styles.arrowDown : ""}
                        onClick={() => setIsContentOpened(!isContentOpened)}
                    />
                </div>
                {loginSessions.length ? (
                    <div className={styles.rightColumn}>
                        <Button
                            appearance="lightBlue"
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-all"
                        >
                            All
                            <Tooltip id="tooltip-all" />
                        </Button>
                        <Button
                            appearance="grey"
                            className={styles.buttonInactive}
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-available"
                        >
                            Yesterday
                            <Tooltip id="tooltip-available" />
                        </Button>
                        <Button
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-sold"
                            appearance="grey"
                            className={styles.buttonInactive}
                        >
                            Last week
                            <Tooltip id="tooltip-sold" />
                        </Button>
                        <Button
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-inProgress"
                            appearance="grey"
                            className={styles.buttonInactive}
                        >
                            Last Month
                            <Tooltip id="tooltip-inProgress" />
                        </Button>
                        <Button
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-delivering"
                            appearance="grey"
                            className={styles.buttonInactive}
                        >
                            Last year
                            <Tooltip id="tooltip-delivering" />
                        </Button>
                        <Button
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-notSelling"
                            appearance="grey"
                            className={styles.buttonInactive}
                        >
                            Custom
                            <Tooltip id="tooltip-notSelling" />
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </div>
            {isContentOpened && (
                <>
                    {loginSessions.length ? (
                        <>
                            <UserLoginSessionTable
                                loginSessions={loginSessions}
                            />
                            <div className={styles.bottomContent}>
                                <div>
                                    <Tooltip id="tooltip-pagintaion" />
                                    <div
                                        data-tooltip-content="Currently doesn`t work"
                                        data-tooltip-id="tooltip-pagintaion"
                                    >
                                        <QuantitySelector
                                            quantityPerPage={
                                                usersQuantityPerPage
                                            }
                                            setQuantityPerPage={
                                                setUserQuantityPerPage
                                            }
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
                                    elementId="session"
                                />
                            </div>
                        </>
                    ) : (
                        <NotRecordsYet />
                    )}
                </>
            )}
        </div>
    );
};
