"use client";

import Image from "next/image";
import Link from "next/link";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { IOrderStore } from "@/store/order/initStore";
import {
    ArtworkOrderPaymentItemDto,
    ArtworkOrderPayoutItemDto,
    MainArtworkOrderGetIdResponseDto,
} from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import { formatDate } from "@/helpers/formatDate";
import { NotRecordsYet } from "@/components/NotRecordsYet";
import { renderPayoutStatus } from "@/helpers/renderPayoutStatus";
import { renderPaymentStatus } from "@/helpers/renderPaymentStatus";

interface OrderPaymentDetailsBlockComponentProps {
    order: MainArtworkOrderGetIdResponseDto;
}

const OrderPaymentDetailsBlockComponent = ({
    order,
}: OrderPaymentDetailsBlockComponentProps) => {
    const [payments, setPayments] = useState<ArtworkOrderPaymentItemDto[]>([]);
    const [payouts, setPayouts] = useState<ArtworkOrderPayoutItemDto[]>([]);
    const [isContentOpened, setIsContentOpened] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<"payments" | "payouts">(
        "payments",
    );

    useEffect(() => {
        apiClient.main.artworkOrder
            .artworkOrderControllerGetPayments({
                orderId: order.id,
            })
            .then((response) => {
                setPayments(response.items);
            });

        apiClient.main.artworkOrder
            .artworkOrderControllerGetPayouts({
                orderId: order.id,
            })
            .then((response) => {
                setPayouts(response.items);
            });
    }, []);

    return (
        <div className={styles.wrapper} id="payment-details">
            <div
                className={`${styles.titleWrapper} ${styles.orderPaymentDetailsTitle}`}
            >
                <div className={styles.title}>
                    Payment Details
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
            </div>
            <div
                className={`${styles.openContent} ${
                    isContentOpened ? styles.opened : ""
                }`}
            >
                <div className={styles.content}>
                    <div className={styles.tabs}>
                        <div
                            className={
                                activeTab === "payments" ? styles.active : ""
                            }
                            onClick={() => setActiveTab("payments")}
                        >
                            Payments
                        </div>
                        <div
                            className={
                                activeTab === "payouts" ? styles.active : ""
                            }
                            onClick={() => setActiveTab("payouts")}
                        >
                            Payouts
                        </div>
                    </div>
                    {activeTab === "payments" ? (
                        <>
                            {payments ? (
                                <div
                                    className={`${styles.wrapperInfo} ${styles.orderPaymentDetailsBlock}`}
                                >
                                    <div
                                        className={`card-body ${styles.table}`}
                                    >
                                        <table
                                            className={`table align-middle table-row-dashed fs-6 gy-5`}
                                        >
                                            <thead>
                                                <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                                                    <th className={styles.idTh}>
                                                        PAYMENT ID
                                                    </th>
                                                    <th
                                                        className={
                                                            styles.dateTh
                                                        }
                                                    >
                                                        PAYMENT DATE
                                                    </th>
                                                    <th
                                                        className={
                                                            styles.amouthTh
                                                        }
                                                    >
                                                        AMOUNT
                                                    </th>
                                                    <th>PAYMENT METHOD</th>
                                                    <th
                                                        className={
                                                            styles.statusTh
                                                        }
                                                    >
                                                        STATUS
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 fw-semibold">
                                                {payments.map((payment) => (
                                                    <tr>
                                                        <td>
                                                            {payment.id}
                                                            {/* <Link
                                                                href="#"
                                                                className={
                                                                    styles.linkTitle
                                                                }
                                                            >
                                                                {payment.id}
                                                            </Link> */}
                                                        </td>
                                                        <td>
                                                            {formatDate(
                                                                payment.created_at,
                                                            )}
                                                        </td>
                                                        <td>{`€${(
                                                            payment.source_amount /
                                                            100
                                                        ).toFixed(2)}`}</td>
                                                        <td>"**** 1273"</td>
                                                        <td
                                                            className={
                                                                styles.statusTd
                                                            }
                                                        >
                                                            {renderPaymentStatus(
                                                                payment.status,
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <NotRecordsYet />
                            )}
                        </>
                    ) : (
                        <>
                            {payouts ? (
                                <div
                                    className={`${styles.wrapperInfo} ${styles.orderPaymentDetailsBlock}`}
                                >
                                    <div
                                        className={`card-body ${styles.table}`}
                                    >
                                        <table
                                            className={`table align-middle table-row-dashed fs-6 gy-5`}
                                        >
                                            <thead>
                                                <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                                                    <th className={styles.idTh}>
                                                        PAYOUT ID
                                                    </th>
                                                    <th
                                                        className={
                                                            styles.dateTh
                                                        }
                                                    >
                                                        PAYOUT DATE
                                                    </th>
                                                    <th
                                                        className={
                                                            styles.amouthTh
                                                        }
                                                    >
                                                        AMOUNT
                                                    </th>
                                                    <th>ROYALTIES</th>
                                                    <th>PAYOUT METHOD</th>
                                                    <th
                                                        className={
                                                            styles.statusTh
                                                        }
                                                    >
                                                        STATUS
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 fw-semibold">
                                                {payouts.map((payout) => (
                                                    <tr>
                                                        <td>
                                                            <Link
                                                                href={`/payouts/${payout.id}`}
                                                                className={
                                                                    styles.linkTitle
                                                                }
                                                            >
                                                                {payout.id}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {formatDate(
                                                                payout.created_at,
                                                            )}
                                                        </td>
                                                        <td>{`€${(
                                                            payout.source_amount /
                                                            100
                                                        ).toFixed(2)}`}</td>
                                                        <td>
                                                            {payout.receiver_user?.profile_type
                                                                .slice(0, 1)
                                                                .toLocaleUpperCase()}
                                                            {payout.receiver_user?.profile_type.slice(
                                                                1,
                                                                payout
                                                                    .receiver_user
                                                                    ?.profile_type
                                                                    .length,
                                                            )}
                                                        </td>
                                                        <td>
                                                            ****{" "}
                                                            {payout.last4Digits}
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.statusTd
                                                            }
                                                        >
                                                            {renderPayoutStatus(
                                                                payout.status,
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <NotRecordsYet />
                            )}
                        </>
                    )}
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
const mapDispatch = {};
const connector = connect(mapState, mapDispatch);

export const OrderPaymentDetailsBlock = connector(
    OrderPaymentDetailsBlockComponent,
);
