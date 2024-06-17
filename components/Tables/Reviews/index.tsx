import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";
import { ReviewsTableProps } from "./module.props";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { sliceTitle } from "@/helpers/sliceTitle";
import { renderReviewStatus } from "@/helpers/renderReviewStatus";
import { formatDate } from "@/helpers/formatDate";
import { Button } from "@/components/UI/Button";

export const ReviewsTable = ({ reviews }: ReviewsTableProps): JSX.Element => {
    return (
        <div className={styles.tableWrapper}>
            <table
                className={`table align-middle table-row-dashed fs-6 ${styles.table}`}
            >
                <thead>
                    <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th>NAME ARTWORK</th>
                        <th>REQUEST TYPE</th>
                        <th>REVIEW REQUEST</th>
                        <th>REVIEW END</th>
                        <th>STATUS</th>
                        <th>REVIEW</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 fw-semibold">
                    {reviews.map((review, index) => (
                        <tr key={index}>
                            <td className={styles.nameTd}>
                                <Link
                                    href={`/artworks/${review.artwork.id}`}
                                    className={styles.titleAvailable}
                                >
                                    <Image
                                        src={imageService.getUrl(
                                            ImageTargetEnum.Artwork,
                                            { artworkId: review.artwork.id },
                                            review.artwork.main_image
                                                ? review.artwork.main_image
                                                      .image_id
                                                : "",
                                            "small",
                                        )}
                                        alt="artwork"
                                        width={40}
                                        height={40}
                                    />
                                    <span>
                                        {sliceTitle(
                                            review.artwork.title || "",
                                            20,
                                        )}
                                    </span>
                                </Link>
                            </td>
                            <td>{"{review.request_type}"}</td>
                            <td>
                                {review.edit_till_date &&
                                    formatDate(review.edit_till_date)}
                            </td>
                            <td>
                                {review.publish_till_date &&
                                    formatDate(review.publish_till_date)}
                            </td>
                            <td className={styles.statusTd}>
                                {renderReviewStatus(review.status)}
                            </td>
                            <td>
                                {review.description ? (
                                    <Link
                                        href={`/artworks/${review.artwork.id}`}
                                    >
                                        <Button
                                            appearance="grey"
                                            className={styles.buttonReview}
                                        >
                                            READ REVIEW
                                        </Button>
                                    </Link>
                                ) : (
                                    "-"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
