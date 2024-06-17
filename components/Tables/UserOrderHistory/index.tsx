import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import styles from "./styles.module.scss";
import { UserOrderHistoryTableProps } from "./module.props";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { sliceTitle } from "@/helpers/sliceTitle";
import { getUserImage } from "@/helpers/getUserImage";
import { formatDate } from "@/helpers/formatDate";
import { renderOrderStatus } from "@/helpers/renderOrderStatus";

export const UserOrderHistoryTable = ({
    orders,
}: UserOrderHistoryTableProps): JSX.Element => {
    const userId = useParams().id;

    return (
        <div className={styles.tableWrapper}>
            <table
                className={`table align-middle table-row-dashed fs-6 ${styles.table}`}
            >
                <thead>
                    <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th>ORDER ID</th>
                        <th>ARTWORK</th>
                        <th>ORDER DATE</th>
                        <th>ORDER TOTAL</th>
                        <th>SHIP</th>
                        <th>ORDER STATUS</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 fw-semibold">
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>
                                <Link
                                    href={`/orders/${order.id}`}
                                    className={styles.titleAvailable}
                                >
                                    {order.id}
                                </Link>
                            </td>
                            <td className={styles.nameTd}>
                                <Link href={`/artworks/${order.artwork.id}`}>
                                    <Image
                                        src={imageService.getUrl(
                                            ImageTargetEnum.Artwork,
                                            { artworkId: order.artwork.id },
                                            order.artwork.main_image
                                                ? order.artwork.main_image
                                                      .image_id
                                                : "",
                                            "small",
                                        )}
                                        alt="artwork"
                                        width={40}
                                        height={40}
                                    />
                                    <span className={styles.titleAvailable}>
                                        {sliceTitle(
                                            order.artwork.title || "",
                                            12,
                                        )}
                                    </span>
                                </Link>
                            </td>
                            <td>{formatDate(order.created_at)}</td>
                            <td>€{(order.total_amount / 100).toFixed(2)}</td>
                            <td>
                                {order.buyer.id === userId && (
                                    <Link
                                        className={`${styles.author} ${styles.titleAvailable}`}
                                        href={`/users/${order.seller.id}`}
                                    >
                                        Seller:
                                        <Image
                                            src={getUserImage(
                                                order.seller.avatar_id,
                                            )}
                                            alt="user"
                                            width={40}
                                            height={40}
                                            style={{
                                                background: "#393945",
                                            }}
                                        />
                                        <span className={styles.titleAvailable}>
                                            {sliceTitle(
                                                order.seller.first_name || "",
                                                7,
                                            )}{" "}
                                            {sliceTitle(
                                                order.seller.last_name || "",
                                                7,
                                            )}
                                        </span>
                                    </Link>
                                )}
                                {order.seller.id === userId && (
                                    <Link
                                        className={`${styles.author} ${styles.titleAvailable}`}
                                        href={`/users/${order.buyer.id}`}
                                    >
                                        Buyer:
                                        <Image
                                            src={getUserImage(
                                                order.buyer.avatar_id,
                                            )}
                                            alt="user"
                                            width={40}
                                            height={40}
                                            style={{
                                                background: "#393945",
                                            }}
                                        />
                                        <span className={styles.titleAvailable}>
                                            {sliceTitle(
                                                order.buyer.first_name || "",
                                                7,
                                            )}{" "}
                                            {sliceTitle(
                                                order.buyer.last_name || "",
                                                7,
                                            )}
                                        </span>
                                    </Link>
                                )}
                            </td>

                            <td>{renderOrderStatus(order.status)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
