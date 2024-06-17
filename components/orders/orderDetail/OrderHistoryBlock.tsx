"use client";

import React, { useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import Image from "next/image";
import { IOrderStore } from "@/store/order/initStore";
import {
    ArtworkOrderStatus,
    MainArtworkOrderGetIdResponseDto,
} from "@/submodules/common-dto/api-client/main";
import { Button } from "@/components/UI/Button";
import ActionsOrderPopup from "./ActionsOrderPopup";

const returnStatusIconColor = (status: ArtworkOrderStatus) => {
    switch (status) {
        case ArtworkOrderStatus.COMPLETED: {
            return "#50CD89";
        }
        case ArtworkOrderStatus.CANCELED: {
            return "#F1416C";
        }

        case ArtworkOrderStatus.DELIVERING: {
            return "#F6C000";
        }
        case ArtworkOrderStatus.PAID: {
            return "#3E97FF";
        }
        case ArtworkOrderStatus.PENDING: {
            return "#7239EA";
        }
    }
};

interface OrderHistoryBlockProps {
    order: MainArtworkOrderGetIdResponseDto;
    setOpenPopup: (popup: string) => void;
    setOrderID: (orderId: number) => void;
}

const OrderHistoryBlockComponent = ({
    order,
    setOpenPopup,
    setOrderID,
}: OrderHistoryBlockProps) => {
    const [isContentOpened, setIsContentOpened] = useState<boolean>(true);
    const [isActionOpened, setIsActionOpened] = useState<boolean>(false);

    const openEditTrackingNumber = () => {
        setOpenPopup("add-tracking-number");
        setIsActionOpened(false);
        setOrderID(order.id);
    };

    const dateFormat = (date: string) => {
        const inputDate = new Date(date);

        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "2-digit",
            month: "numeric",
            day: "numeric",
        };

        return inputDate.toLocaleDateString("en-US", options);
    };

    const timeFormat = (date: string) => {
        const inputDate = new Date(date);

        const hours = inputDate.getHours();
        const minutes = inputDate.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";

        const formattedTime = `${hours % 12 || 12}:${minutes.toLocaleString(
            "en-US",
            { minimumIntegerDigits: 2 },
        )} ${ampm}`;
        return formattedTime;
    };

    const returnOrderStatus = (orderStatus: ArtworkOrderStatus): string => {
        const statusMap: { [key: string]: string } = {
            pending: "New order",
            paid: "Order placed",
            delivering: "Delivering",
            payouts_proceed: "Payouts Proceed",
            completed: "Completed",
            canceled: "Canceled",
        };

        return statusMap[orderStatus] || "";
    };

    console.log(order);

    return (
        <div
            className={`${styles.wrapper} ${styles.historyWrapper}`}
            id="order-history"
        >
            <div
                className={`${styles.titleWrapper} ${styles.orderHistoryTitleWrapper}`}
            >
                <div className={styles.title}>
                    Order History
                    <Image
                        src="/media/arrow-top.svg"
                        alt="arrow"
                        width="20"
                        height="21"
                        className={`${styles.arrow} ${
                            !isContentOpened ? styles.arrowDown : ""
                        }`}
                        onClick={() => setIsContentOpened(!isContentOpened)}
                    />
                </div>
                <div className={styles.actionBtnWrapper}>
                    {order.status === ArtworkOrderStatus.CANCELED ||
                    order.status === ArtworkOrderStatus.COMPLETED ? (
                        <></>
                    ) : (
                        <>
                            <Button
                                appearance="blue"
                                className={styles.editBtn}
                                onClick={() =>
                                    setIsActionOpened(!isActionOpened)
                                }
                            >
                                Actions
                            </Button>
                            {isActionOpened && (
                                <ActionsOrderPopup
                                    orderId={order.id}
                                    setIsActionOpened={() =>
                                        setIsActionOpened(!isActionOpened)
                                    }
                                    status={order.status}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
            <div
                className={`${styles.openContent} ${
                    isContentOpened ? styles.opened : ""
                }`}
            >
                <div className={styles.content}>
                    <div className={styles.contentWrapper}>
                        <div
                            className={`${styles.wrapperInfo} ${styles.orderHistoryBlock}`}
                        >
                            {order.status_history.map((history, index) => (
                                <div className={styles.item} key={index}>
                                    <div className={styles.itemLft}>
                                        <div className={styles.date}>
                                            {dateFormat(history.created_at)}
                                        </div>
                                        <div className={styles.time}>
                                            {timeFormat(history.created_at)}
                                        </div>
                                    </div>

                                    <div className={styles.status}>
                                        <svg
                                            width="20"
                                            height="21"
                                            viewBox="0 0 20 21"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="10"
                                                cy="10.5"
                                                r="8"
                                                fill="#F9F9F9"
                                                stroke={returnStatusIconColor(
                                                    history.status,
                                                )}
                                                stroke-width="4"
                                            />
                                        </svg>
                                        <Image
                                            src="/media/line.svg"
                                            alt="line"
                                            width="2"
                                            height="31"
                                            className={styles.line}
                                        />
                                        {returnOrderStatus(history.status)}
                                    </div>
                                    {order.status ===
                                        ArtworkOrderStatus.DELIVERING &&
                                        history.status ===
                                            ArtworkOrderStatus.DELIVERING && (
                                            /* order.delivery_tracking_number === null */ <div
                                                className={`${styles.wrapperBtn} ${styles.orderHistoryBlock}`}
                                            >
                                                <Button
                                                    appearance="lightBlue"
                                                    className={
                                                        styles.trackNumber
                                                    }
                                                    onClick={
                                                        openEditTrackingNumber
                                                    }
                                                >
                                                    <span
                                                        className={styles.plus}
                                                    >
                                                        <Image
                                                            src="/media/plus-blue.svg"
                                                            alt="plus"
                                                            width="18"
                                                            height="18"
                                                        />
                                                    </span>
                                                    Tracking Number
                                                </Button>
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>{" "}
                    </div>
                    {/* <div className={styles.bottomContent}>
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
                    </div> */}
                </div>
            </div>
        </div>
    );
};

const mapState = (state: { order: IOrderStore }) => {
    return {
        order: state.order.order,
    };
};
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
    setOrderID: (orderId: number) => ({
        type: "SET_ORDER_ID",
        orderId,
    }),
};
const connector = connect(mapState, mapDispatch);

export const OrderHistoryBlock = connector(OrderHistoryBlockComponent);
