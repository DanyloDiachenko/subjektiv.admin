import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/UI/Button";
import { renderArtworkStatus } from "@/helpers/renderArtworkStatus";
import styles from "./styles.module.scss";
import { UserStudioTableProps } from "./module.props";
import { sliceTitle } from "@/helpers/sliceTitle";
import { getUserImage } from "@/helpers/getUserImage";
import { getArtworkImage } from "@/helpers/getArtworkImage";

export const UserStudioTable = ({
    artworks,
}: UserStudioTableProps): JSX.Element => {
    console.log(artworks);
    return (
        <div className={styles.tableWrapper}>
            <table
                className={`table align-middle table-row-dashed fs-6 ${styles.table}`}
            >
                <thead>
                    <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th className={styles.nameArtwork}>NAME ARTWORK</th>
                        <th className={styles.category}>CATEGORY</th>
                        <th className={styles.status}>STATUS</th>
                        <th className={styles.owner}>OWNER</th>
                        <th className={styles.price}>PRICE</th>
                        <th className={styles.purchaseRequests}>
                            PURCHASE REQUESTS
                        </th>
                        <th className={styles.confirmStatus}>
                            CONFIRMING <br />
                            <span style={{ whiteSpace: "nowrap" }}>
                                ARTWORK STATUS
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 fw-semibold">
                    {artworks.map((artwork, index) => (
                        <tr key={index}>
                            <td className={styles.nameTd}>
                                <Link href={`/artworks/${artwork.id}`}>
                                    <Image
                                        src={getArtworkImage(
                                            artwork.id,
                                            artwork.main_image?.image_id,
                                        )}
                                        alt="artwork"
                                        width={40}
                                        height={40}
                                    />
                                    <span className={styles.titleAvailable}>
                                        {sliceTitle(artwork.title || "", 20)}
                                    </span>
                                </Link>
                            </td>
                            <td>
                                <div className={styles.titleBlocked}>
                                    {artwork.category?.title}
                                </div>
                            </td>
                            <td className={styles.statusTd}>
                                {renderArtworkStatus(artwork.status)}
                            </td>
                            <td>
                                {artwork.owner ? (
                                    <div className={styles.owner}>
                                        <Image
                                            src={getUserImage(
                                                artwork.owner.avatar_id,
                                            )}
                                            alt="user"
                                            width={40}
                                            height={40}
                                            style={{
                                                background: "#393945",
                                            }}
                                        />
                                        <Link
                                            href="#"
                                            className={styles.titleAvailable}
                                        >
                                            {sliceTitle(
                                                artwork.owner.first_name || "",
                                                25,
                                            )}{" "}
                                            {sliceTitle(
                                                artwork.owner.last_name || "",
                                                25,
                                            )}
                                        </Link>
                                    </div>
                                ) : (
                                    <div className={styles.titleBlocked}>-</div>
                                )}
                            </td>
                            <td>
                                <div className={styles.titleBlocked}>
                                    €{(artwork.price / 100).toFixed(2)}
                                </div>
                            </td>
                            <td>
                                <div className={styles.titleBlocked}>0</div>
                            </td>
                            <td className={styles.sendRequestTd}>
                                <Button
                                    appearance="grey"
                                    className={styles.button}
                                >
                                    Send Request (Currently doesn`t work)
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
