"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import {
    ArtworkOrderPayoutItemDto,
    PayoutReceiverTypeEnum,
    PayoutStateEnum,
} from "@/submodules/common-dto/api-client/main";
import { sliceTitle } from "@/helpers/sliceTitle";
import Pagination from "@/components/UI/Pagination";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import apiClient from "@/api/apiClient";
import { QuantitySelector } from "@/components/UI/QuantitySelector";
import { NothingFound } from "@/components/NothingFound";
import { PayoutsTableProps } from "./module.props";
import { Tooltip } from "@/components/UI/Tootip";
import { renderPayoutStatus } from "@/helpers/renderPayoutStatus";
import { getUserImage } from "@/helpers/getUserImage";
import { Select } from "@/components/UI/Select";
import Image from "next/image";
import { formatEnumValue } from "@/helpers/formatEnumValue";
import { TotalItems } from "@/components/UI/TotalItems";

const payoutQuantityPerPageVariants: ISelectVariant[] = [
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

const payoutStatuses: ISelectVariant[] = [
    {
        title: "Accepted",
        value: PayoutStateEnum.ACCEPTED,
    },
    {
        title: "Canceled",
        value: PayoutStateEnum.CANCELLED,
    },
    {
        title: "Created",
        value: PayoutStateEnum.CREATED,
    },
    {
        title: "Rejected",
        value: PayoutStateEnum.REJECTED,
    },
    {
        title: "Released",
        value: PayoutStateEnum.RELEASED,
    },
];

const receiverTypes: ISelectVariant[] = [
    {
        title: "Payout",
        value: PayoutReceiverTypeEnum.PAYOUT,
    },
    {
        title: "Royalty",
        value: PayoutReceiverTypeEnum.ROYALTY,
    },
];

export const PayoutsTable = ({
    payoutsResponse,
}: PayoutsTableProps): JSX.Element => {
    const [payoutsQuantityPerPage, setPayoutsQuantityPerPage] =
        useState<ISelectVariant>(payoutQuantityPerPageVariants[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(
        payoutsResponse.total_pages,
    );
    const [total, setTotal] = useState<number>(payoutsResponse.total);
    const [payouts, setPayouts] = useState<ArtworkOrderPayoutItemDto[]>(
        payoutsResponse.items,
    );
    const [status, setStatus] = useState<ISelectVariant>(null);
    const [receiverType, setReceiverType] = useState<ISelectVariant>(null);
    const [search, setSearch] = useState<string>("");

    const getPayouts = async (updatedPage?: number) => {
        try {
            const response =
                await apiClient.main.artworkOrder.artworkOrderControllerGetPayouts(
                    {
                        page: updatedPage ? updatedPage : currentPage,
                        statuses: status
                            ? [status.value as PayoutStateEnum]
                            : undefined,
                        receiverTypes: receiverType
                            ? [receiverType.value as PayoutReceiverTypeEnum]
                            : undefined,
                        search: search,
                    },
                );

            setPayouts(response.items);
            setTotalPages(response.total_pages);
            setTotal(response.total);
        } catch (error) {
            console.log("error getting payouts", error);
        }
    };

    useEffect(() => {
        getPayouts();
    }, [currentPage]);

    useEffect(() => {
        getPayouts(1);
    }, [search, status, receiverType]);

    return (
        <>
            <div className="card-header border-0 pt-6">
                <div className="card-title">
                    <div className="d-flex align-items-center position-relative my-1">
                        <Image
                            className="position-absolute ms-5"
                            src="/media/search.svg"
                            alt="search"
                            width={14}
                            height={18}
                        />
                        <input
                            type="text"
                            className="form-control form-control-solid w-250px ps-13"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <TotalItems number={total} />
                    </div>
                </div>
                <div className="card-toolbar">
                    <div
                        className={`d-flex justify-content-end ${styles.wrapper}`}
                    >
                        <Select
                            placeholder="Payout status"
                            activeVariant={status}
                            setActiveVariant={setStatus}
                            variants={payoutStatuses}
                            className={styles.selector}
                        />
                        <Select
                            placeholder="Receiver Types"
                            activeVariant={receiverType}
                            setActiveVariant={setReceiverType}
                            variants={receiverTypes}
                            className={styles.selectorType}
                        />
                    </div>
                </div>
            </div>

            <div className={`card-body py-4 ${styles.table}`}>
                <table
                    className={`table align-middle table-row-dashed fs-6 gy-5`}
                >
                    <thead>
                        <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th>PAYOUT ID</th>
                            <td>DESCRIPTION</td>
                            <td>RECEIVER</td>
                            <td>RECEIVER TYPE</td>
                            <td>STATUS</td>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                        {payouts.length
                            ? payouts.map((payout, index) => (
                                  <tr key={index}>
                                      <td>
                                          <Link
                                              href={"/payouts/" + payout.id}
                                              className={styles.linkTitle}
                                          >
                                              {payout.id}
                                          </Link>
                                      </td>
                                      <td>
                                          <Link
                                              href={"/payouts/" + payout.id}
                                              className={styles.linkTitle}
                                          >
                                              {sliceTitle(
                                                  payout.description,
                                                  30,
                                              )}
                                          </Link>
                                      </td>
                                      <td>
                                          <Link
                                              href={
                                                  "/users/" +
                                                  payout.receiver_user?.id
                                              }
                                              className={styles.user}
                                          >
                                              <img
                                                  src={getUserImage(
                                                      payout.receiver_user
                                                          ?.avatar_id || "",
                                                  )}
                                                  alt="receiver avatar"
                                              />
                                              <div className={styles.linkTitle}>
                                                  {sliceTitle(
                                                      payout.receiver_user
                                                          ?.first_name || "",
                                                      20,
                                                  )}
                                                  {sliceTitle(
                                                      payout.receiver_user
                                                          ?.last_name || "",
                                                      20,
                                                  )}
                                              </div>
                                          </Link>
                                      </td>
                                      <td>
                                          {formatEnumValue(
                                              payout.receiver_type,
                                          )}
                                      </td>
                                      <td>
                                          {renderPayoutStatus(payout.status)}
                                      </td>
                                  </tr>
                              ))
                            : ""}
                    </tbody>
                </table>
            </div>
            {payouts && !payouts.length && <NothingFound />}
            <div className={styles.bottomContent}>
                <div>
                    <Tooltip id="pagination-tooltip" />
                    <div
                        data-tooltip-content="Currently doesn`t work"
                        data-tooltip-id="pagination-tooltip"
                    >
                        <QuantitySelector
                            quantityPerPage={payoutsQuantityPerPage}
                            setQuantityPerPage={setPayoutsQuantityPerPage}
                            quantityPerPageVariants={
                                payoutQuantityPerPageVariants
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
