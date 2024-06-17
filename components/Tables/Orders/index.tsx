"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { connect } from "react-redux";

import styles from "./order.module.scss";
import Pagination from "@/components/UI/Pagination";
import { Tooltip } from "@/components/UI/Tootip";
import ActionsPopup from "./ActionsPopup";
import {
    ArtworkOrderItemDto,
    ArtworkOrderSortingFields,
    SortOrder,
} from "@/submodules/common-dto/api-client/main";
import { NothingFound } from "@/components/NothingFound";
import { QuantitySelector } from "@/components/UI/QuantitySelector";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import { renderOrderStatus } from "@/helpers/renderOrderStatus";
import { truncateString } from "@/helpers/truncateString";
import { IRootState } from "@/store";
import { formatDate } from "@/helpers/formatDate";
import { getArtworkImage } from "@/helpers/getArtworkImage";
import { sliceTitle } from "@/helpers/sliceTitle";
import { getUserImage } from "@/helpers/getUserImage";

interface OrdersProps {
    orders: ArtworkOrderItemDto[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    ordersQuantityPerPage: ISelectVariant;
    setOrdersQuantityPerPage: (ordersQuantityPerPage: ISelectVariant) => void;
    ordersQuantityPerPageVariants: ISelectVariant[];
    setOpenPopup: (popup: string) => void;
    setOrderID: (orderID: number) => void;
    onThClick: (
        sortField: ArtworkOrderSortingFields,
        sortOrder: SortOrder,
    ) => void;
}

const OrdersTable = ({
    orders,
    totalPages,
    setCurrentPage,
    currentPage,
    ordersQuantityPerPage,
    setOrdersQuantityPerPage,
    ordersQuantityPerPageVariants,
    setOpenPopup,
    setOrderID,
    onThClick,
}: OrdersProps): JSX.Element => {
    const [openedActionsOrderId, setOpenedActionsOrderId] = useState<number>(0);
    const [sort, setSort] = useState<{
        field: ArtworkOrderSortingFields | undefined;
        order: SortOrder | undefined;
    }>({
        field: undefined,
        order: undefined,
    });

    const openActionPopup = (id: number) => {
        if (openedActionsOrderId === id) {
            return () => setOpenedActionsOrderId(0);
        } else {
            return () => setOpenedActionsOrderId(id);
        }
    };

    const chooseAction = (id: number, popup: string) => {
        setOrderID(id);
        setOpenPopup(popup);
        setOpenedActionsOrderId(0);
    };

    return (
        <>
            <div className={`card-body py-4 ${styles.table}`}>
                <table
                    className={`table align-middle table-row-dashed fs-6 gy-5`}
                >
                    <thead>
                        <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th className={styles.thId}>
                                <div className={styles.arrowContent}>
                                    <span
                                        onClick={() => {
                                            setSort({
                                                order:
                                                    sort.order === SortOrder.ASC
                                                        ? SortOrder.DESC
                                                        : SortOrder.ASC,
                                                field: ArtworkOrderSortingFields.ID,
                                            });
                                            onThClick(
                                                ArtworkOrderSortingFields.ID,
                                                sort.order === SortOrder.ASC
                                                    ? SortOrder.DESC
                                                    : SortOrder.ASC,
                                            );
                                        }}
                                    >
                                        ORDER ID
                                    </span>
                                    <div className={styles.arrows}>
                                        {sort.field === "id" &&
                                            sort.order === SortOrder.ASC && (
                                                <img
                                                    src="/media/arrow-top.svg"
                                                    alt="sort"
                                                />
                                            )}
                                        {sort.field === "id" &&
                                            sort.order === SortOrder.DESC && (
                                                <img
                                                    src="/media/arrow-top.svg"
                                                    alt="sort"
                                                    style={{
                                                        transform:
                                                            "rotate(180deg)",
                                                    }}
                                                />
                                            )}
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className={styles.arrowContent}>
                                    <span
                                        onClick={() => {
                                            setSort({
                                                order:
                                                    sort.order === SortOrder.ASC
                                                        ? SortOrder.DESC
                                                        : SortOrder.ASC,
                                                field: ArtworkOrderSortingFields.CREATED_AT,
                                            });
                                            onThClick(
                                                ArtworkOrderSortingFields.CREATED_AT,
                                                sort.order === SortOrder.ASC
                                                    ? SortOrder.DESC
                                                    : SortOrder.ASC,
                                            );
                                        }}
                                    >
                                        CREATED AT
                                    </span>
                                    <div className={styles.arrows}>
                                        {sort.field === "created_at" &&
                                            sort.order === SortOrder.ASC && (
                                                <img
                                                    src="/media/arrow-top.svg"
                                                    alt="sort"
                                                />
                                            )}
                                        {sort.field === "created_at" &&
                                            sort.order === SortOrder.DESC && (
                                                <img
                                                    src="/media/arrow-top.svg"
                                                    alt="sort"
                                                    style={{
                                                        transform:
                                                            "rotate(180deg)",
                                                    }}
                                                />
                                            )}
                                    </div>
                                </div>
                            </th>
                            <th>BUYER</th>
                            <th>SELLER</th>
                            <th>ARTWORK</th>
                            <th>ORDER STATUS</th>
                            <th>ORDER TOTAL</th>
                            <th>DELIVERY COST</th>
                            <th>
                                VAT <br />
                                COST
                            </th>

                            <th>
                                TRACKING
                                <br />
                                NUMBER
                            </th>
                            <th>DELIVERY OPERATOR</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                        {orders.map((order, index) => (
                            <>
                                <tr key={index}>
                                    <td className={styles.orderId}>
                                        <Link
                                            href={"/orders/" + order.id}
                                            className={styles.linkTitle}
                                        >
                                            {order.id}
                                        </Link>
                                    </td>
                                    <td>{formatDate(order.created_at)}</td>
                                    <td className={styles.user}>
                                        <div>
                                            <Link
                                                href={
                                                    "/users/" + order.buyer.id
                                                }
                                            >
                                                <img
                                                    src={getUserImage(
                                                        order.buyer.avatar_id,
                                                    )}
                                                    alt="buyer avatar"
                                                />
                                                <span
                                                    className={styles.linkTitle}
                                                >
                                                    {truncateString(
                                                        order.buyer.first_name +
                                                            " " +
                                                            order.buyer
                                                                .last_name,
                                                        17,
                                                    )}
                                                </span>
                                            </Link>
                                        </div>
                                    </td>
                                    <td className={styles.user}>
                                        <div>
                                            <Link
                                                href={
                                                    "/users/" + order.seller.id
                                                }
                                            >
                                                <img
                                                    src={getUserImage(
                                                        order.seller.avatar_id,
                                                    )}
                                                    alt="seller avatar"
                                                />
                                                <span
                                                    className={styles.linkTitle}
                                                >
                                                    {truncateString(
                                                        order.seller
                                                            .first_name +
                                                            " " +
                                                            order.seller
                                                                .last_name,
                                                        17,
                                                    )}
                                                </span>
                                            </Link>
                                        </div>
                                    </td>
                                    <td className={`d-flex align-items-center`}>
                                        <Link
                                            href={
                                                "/artworks/" + order.artwork.id
                                            }
                                            className="symbol overflow-hidden me-3"
                                        >
                                            <Image
                                                src={getArtworkImage(
                                                    order.artwork.id,
                                                    order.artwork.main_image
                                                        ?.image_id,
                                                )}
                                                width={50}
                                                height={50}
                                                alt="artwork"
                                            />
                                        </Link>

                                        <div className="d-flex">
                                            <Link
                                                href={
                                                    "/artworks/" +
                                                    order.artwork.id
                                                }
                                                className={styles.linkTitle}
                                            >
                                                {sliceTitle(
                                                    order.artwork.title || "",
                                                    25,
                                                )}
                                            </Link>
                                        </div>
                                    </td>
                                    <td>{renderOrderStatus(order.status)}</td>
                                    <td>
                                        €
                                        {order.total_amount &&
                                            (order.total_amount / 100).toFixed(
                                                2,
                                            )}
                                    </td>
                                    <td>
                                        €
                                        {order.delivery_amount &&
                                            (
                                                order.delivery_amount / 100
                                            ).toFixed(2)}
                                    </td>
                                    <td>
                                        €
                                        {order.vat_amount &&
                                            (order.vat_amount / 100).toFixed(2)}
                                    </td>

                                    <td>
                                        {order.delivery_tracking_number &&
                                            sliceTitle(
                                                order.delivery_tracking_number,
                                                5,
                                            )}
                                    </td>
                                    <td>{order.delivery_operator}</td>
                                    <td className={styles.actionsTd}>
                                        <div
                                            className={styles.actionsBtn}
                                            onClick={openActionPopup(order.id)}
                                        >
                                            <span>Actions</span>
                                            {openedActionsOrderId ? (
                                                <Image
                                                    src="/media/icon-top.svg"
                                                    alt="arrow"
                                                    width={12}
                                                    height={6}
                                                />
                                            ) : (
                                                <Image
                                                    src="/media/icon-top.svg"
                                                    alt="arrow"
                                                    width={12}
                                                    height={6}
                                                    style={{
                                                        transform:
                                                            "rotate(180deg)",
                                                    }}
                                                />
                                            )}
                                        </div>
                                        {openedActionsOrderId === order.id && (
                                            <ActionsPopup
                                                onClick={chooseAction}
                                                orderId={order.id}
                                            />
                                        )}
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            {!orders.length && <NothingFound />}

            <div className={styles.bottomContent}>
                <div>
                    <Tooltip id="tooltip-pagintaion" />
                    <div
                        data-tooltip-content="Currently doesn`t work"
                        data-tooltip-id="tooltip-pagintaion"
                    >
                        <QuantitySelector
                            quantityPerPage={ordersQuantityPerPage}
                            setQuantityPerPage={setOrdersQuantityPerPage}
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
                />
            </div>
        </>
    );
};
const mapState = (state: IRootState) => {
    return {
        openPopup: state.openPopup.openPopup,
        orderId: state.openPopup.orderId,
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

export default connector(OrdersTable);
