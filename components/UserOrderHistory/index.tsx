"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import styles from "./styles.module.scss";
import { Button } from "../UI/Button";
import { QuantitySelector } from "../UI/QuantitySelector";
import { ISelectVariant } from "../UI/Select/variant.interface";
import Pagination from "../UI/Pagination";
import { Tooltip } from "../UI/Tootip";
import apiClient from "@/api/apiClient";
import { UserOrderHistoryProps } from "./module.props";
import { ArtworkOrderItemDto } from "@/submodules/common-dto/api-client/main";
import { NotRecordsYet } from "../NotRecordsYet";
import { UserOrderHistoryTable } from "../Tables/UserOrderHistory";

export const UserOrderHistory = ({
    username,
}: UserOrderHistoryProps): JSX.Element => {
    const ordersQuantityPerPageVariants: ISelectVariant[] = [
        {
            title: "5",
            value: "5",
        },
        {
            title: "10",
            value: "10",
        },
        {
            title: "20",
            value: "20",
        },
    ];

    const [orders, setOrders] = useState<ArtworkOrderItemDto[]>([]);
    const [ordersQuantityPerPage, setOrdersQuantityPerPage] =
        useState<ISelectVariant>(ordersQuantityPerPageVariants[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, _] = useState<number>(1);
    const [isContentOpened, setIsContentOpened] = useState<boolean>(true);

    const getOrders = async () => {
        try {
            const response1 =
                await apiClient.main.artworkOrder.artworkOrderControllerGetArtworkOrders(
                    {
                        page: currentPage,
                        buyerUsername: username,
                        /* sortField: ArtworkOrderSortingFields.CREATED_AT,
                        sortOrder: SortOrder.DESC, */
                    },
                );
            const response2 =
                await apiClient.main.artworkOrder.artworkOrderControllerGetArtworkOrders(
                    {
                        page: currentPage,
                        sellerUsername: username,
                        /* sortField: ArtworkOrderSortingFields.CREATED_AT,
                        sortOrder: SortOrder.DESC, */
                    },
                );

            const newOrders = [...response1.items, ...response2.items].sort(
                (orderA, orderB) =>
                    new Date(orderB.created_at).getTime() -
                    new Date(orderA.created_at).getTime(),
            );

            setOrders(newOrders);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrders();
    }, [currentPage]);

    return (
        <div className={styles.card} id="order-history">
            <div className={styles.cardHeader}>
                <div className={styles.leftColumn}>
                    <h2>Order History</h2>
                    <Image
                        src="/media/arrow-top.svg"
                        alt="arrow"
                        width="20"
                        height="21"
                        className={!isContentOpened ? styles.arrowDown : ""}
                        onClick={() => setIsContentOpened(!isContentOpened)}
                    />
                </div>
                {orders.length ? (
                    <div className={styles.rightColumn}>
                        <Button
                            appearance="lightBlue"
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-collection-all"
                        >
                            All
                            <Tooltip id="tooltip-collection-all" />
                        </Button>
                        <Button
                            appearance="grey"
                            className={styles.buttonInactive}
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-collection-owned"
                        >
                            Purchase
                            <Tooltip id="tooltip-collection-owned" />
                        </Button>
                        <Button
                            appearance="grey"
                            className={styles.buttonInactive}
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-collection-cuorToken"
                        >
                            Sale
                            <Tooltip id="tooltip-collection-cuorToken" />
                        </Button>
                        <Button
                            appearance="grey"
                            className={styles.buttonInactive}
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-collection-sold"
                        >
                            Royalties
                            <Tooltip id="tooltip-collection-sold" />
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </div>
            {isContentOpened && (
                <>
                    {orders.length ? (
                        <>
                            <UserOrderHistoryTable orders={orders} />
                            <div className={styles.bottomContent}>
                                <div>
                                    <Tooltip id="tooltip-pagintaion" />
                                    <div
                                        data-tooltip-content="Currently doesn`t work"
                                        data-tooltip-id="tooltip-pagintaion"
                                    >
                                        <QuantitySelector
                                            quantityPerPage={
                                                ordersQuantityPerPage
                                            }
                                            setQuantityPerPage={
                                                setOrdersQuantityPerPage
                                            }
                                            quantityPerPageVariants={
                                                ordersQuantityPerPageVariants
                                            }
                                        />
                                    </div>
                                </div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    setCurrentPage={setCurrentPage}
                                    elementId="order-history"
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
