import Image from "next/image";
import Link from "next/link";

import { renderArtworkStatus } from "../../../helpers/renderArtworkStatus";
import styles from "./styles.module.scss";
import { UserCollectionTableProps } from "./module.props";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { sliceTitle } from "@/helpers/sliceTitle";
import { getUserImage } from "@/helpers/getUserImage";

export const UserCollectionTable = ({
    artworks,
}: UserCollectionTableProps): JSX.Element => {
    return (
        <div className={styles.tableWrapper}>
            <table
                className={`table align-middle table-row-dashed fs-6 ${styles.table}`}
            >
                <thead>
                    <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th className={styles.name}>NAME</th>
                        <th className={styles.status}>STATUS</th>
                        <th className={styles.author}>AUTHOR</th>
                        <th className={styles.category}>CATEGORY</th>
                        <th className={styles.price}>PRICE</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 fw-semibold">
                    {artworks.map((artwork, index) => (
                        <tr key={index}>
                            <td className={styles.nameTd}>
                                <Link
                                    href={`/users/${artwork.id}`}
                                    className={styles.titleAvailable}
                                >
                                    <Image
                                        src={imageService.getUrl(
                                            ImageTargetEnum.Artwork,
                                            { artworkId: artwork.id },
                                            artwork.main_image
                                                ? artwork.main_image.image_id
                                                : "",
                                            "small",
                                        )}
                                        alt="artwork"
                                        width={40}
                                        height={40}
                                    />
                                    <span>
                                        {sliceTitle(artwork.title || "", 20)}
                                    </span>
                                </Link>
                            </td>
                            <td className={styles.statusTd}>
                                {renderArtworkStatus(artwork.status)}
                            </td>
                            <td>
                                <div className={styles.author}>
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
                            </td>
                            <td>
                                <div className={styles.titleBlocked}>
                                    {artwork.category?.title}
                                </div>
                            </td>
                            <td>
                                <div className={styles.titleBlocked}>
                                    €{artwork.price}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
