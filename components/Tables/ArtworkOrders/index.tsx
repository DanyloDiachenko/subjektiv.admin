"use client";

import Link from "next/link";
import { useState } from "react";

import styles from "./styles.module.scss";
import { ArtworkOrdersProps } from "./module.props";
import { ArtworkOrderItemDto } from "@/submodules/common-dto/api-client/main";
import { sliceTitle } from "@/helpers/sliceTitle";
import { getUserImage } from "@/helpers/getUserImage";
import { formatDate } from "@/helpers/formatDate";

export const ArtworkOrders = ({
    ordersResponse,
}: ArtworkOrdersProps): JSX.Element => {
    const [orders, _] = useState<ArtworkOrderItemDto[]>(ordersResponse.items);
    /* const [totalPages, setTotalPages] = useState<number>( */
    /*     ordersResponse.total_pages, */
    /* ); */
    /* const [currentPage, setCurrentPage] = useState<number>(1); */

    return (
        <div className={styles.tableWrapper}>
            <table
                className={`table align-middle table-row-dashed fs-6 ${styles.table}`}
            >
                <thead>
                    <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th>ORDER ID</th>
                        {/* <th>ARTWORK</th> */}
                        <th>BUYER</th>
                        <th>SELLER</th>
                        <th>TOTAL</th>
                        <th>ESTIMATED DELIVERY DATE</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 fw-semibold">
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>
                                <Link
                                    href={`/orders/${order.id}`}
                                    className={styles.linkTitle}
                                >
                                    {order.id}
                                </Link>
                            </td>
                            {/* <td>
                                <Link
                                    className={`${styles.artworkImage} ${styles.linkTitle}`}
                                    href={`/artworks/${order.artwork.id}`}
                                >
                                    <img
                                        src={getArtworkImage(
                                            order.artwork.id,
                                            order.artwork.main_image?.image_id
                                        )}
                                        alt="artwork image"
                                    />
                                    <div>
                                        {sliceTitle(
                                            order.artwork.title || "",
                                            20
                                        )}
                                    </div>
                                </Link>
                            </td> */}
                            <td>
                                <Link
                                    className={`${styles.user} ${styles.linkTitle}`}
                                    href={`/users/${order.buyer.id}`}
                                >
                                    <img
                                        src={getUserImage(
                                            order.buyer.avatar_id,
                                        )}
                                        alt="buyer image"
                                    />
                                    {sliceTitle(
                                        order.buyer.first_name || "",
                                        20,
                                    )}{" "}
                                    {sliceTitle(
                                        order.buyer.last_name || "",
                                        20,
                                    )}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    className={`${styles.user} ${styles.linkTitle}`}
                                    href={`/users/${order.seller.id}`}
                                >
                                    <img
                                        src={getUserImage(
                                            order.seller.avatar_id,
                                        )}
                                        alt="seller image"
                                    />
                                    {sliceTitle(
                                        order.seller.first_name || "",
                                        20,
                                    )}{" "}
                                    {sliceTitle(
                                        order.seller.last_name || "",
                                        20,
                                    )}
                                </Link>
                            </td>
                            <td>€{(order.total_amount / 100).toFixed(2)}</td>
                            <td>
                                {order.estimated_delivery_date &&
                                    formatDate(order.estimated_delivery_date)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
