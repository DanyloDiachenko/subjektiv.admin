"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { connect } from "react-redux";

import { ArtworkExpertHistoryProps } from "./module.props";
import styles from "./styles.module.scss";
import { Button } from "../UI/Button";
import { formatDate } from "@/helpers/formatDate";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { NotRecordsYet } from "../NotRecordsYet";
import { ReviewRequests } from "../Tables/ReviewRequests";
import { Tooltip } from "react-tooltip";
import { QuantitySelector } from "../UI/QuantitySelector";
import Pagination from "../UI/Pagination";
import { ISelectVariant } from "../UI/Select/variant.interface";
import { MainArtworkReviewRequestItemDto } from "@/submodules/common-dto/api-client/main";

const requestsPerPageVariants: ISelectVariant[] = [
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

const ArtworkExpertHistoryComponent = ({
    artwork,
    setOpenPopup,
    reviewRequests,
}: ArtworkExpertHistoryProps) => {
    const [isContentOpened, setIsContentOpened] = useState<boolean>(true);
    const [requestsPerPage, setRequestsPerPage] = useState<ISelectVariant>(
        requestsPerPageVariants[0],
    );
    const [requests, _] = useState<MainArtworkReviewRequestItemDto[] | null>(
        reviewRequests?.items || null,
    );
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, __] = useState<number>(reviewRequests?.total_pages || 1);

    const getUserImageSrc = (): string => {
        if (!artwork.review?.expert.avatar_id) {
            return "/media/no-avatar.png";
        }

        if (artwork.review?.expert.avatar_id) {
            return imageService.getUrl(
                ImageTargetEnum.UserAvatar,
                null,
                artwork.review?.expert.avatar_id || "",
                "small",
            );
        }

        return "/media/no-avatar.png";
    };

    return (
        <div className={styles.card} id="expertHistory">
            <div className={styles.cardHeader}>
                <div className={styles.leftColumn}>
                    <h2>
                        Expert History
                        {artwork.review || requests?.length ? (
                            <Image
                                src="/media/arrow-top.svg"
                                alt="arrow"
                                width="20"
                                height="21"
                                className={
                                    !isContentOpened ? styles.arrowDown : ""
                                }
                                onClick={() =>
                                    setIsContentOpened(!isContentOpened)
                                }
                            />
                        ) : (
                            ""
                        )}
                    </h2>
                </div>
                {artwork.review && (
                    <div className={styles.rightColumn}>
                        <Button
                            appearance="lightBlue"
                            className={styles.editButton}
                            onClick={() => setOpenPopup("editExpertReview")}
                        >
                            <Image
                                src="/media/edit.svg"
                                alt="edit"
                                width="20"
                                height="20"
                            />
                            <span>Edit</span>
                        </Button>
                    </div>
                )}
            </div>
            {
                <>
                    {isContentOpened && (
                        <>
                            {artwork.review && (
                                <>
                                    <div className={styles.authorDate}>
                                        <div className={styles.author}>
                                            <Link
                                                href={`/users/${artwork.review?.expert.id}`}
                                            >
                                                <Image
                                                    src={getUserImageSrc()}
                                                    alt={
                                                        artwork.review?.expert
                                                            .first_name ||
                                                        "" +
                                                            artwork.review
                                                                ?.expert
                                                                .last_name
                                                    }
                                                    width={40}
                                                    height={40}
                                                />
                                            </Link>
                                            <div>
                                                <Link
                                                    className={styles.name}
                                                    href={`/users/${artwork.review?.expert.id}`}
                                                >
                                                    {
                                                        artwork.review?.expert
                                                            .first_name
                                                    }{" "}
                                                    {
                                                        artwork.review?.expert
                                                            .last_name
                                                    }{" "}
                                                </Link>
                                                <div className={styles.job}>
                                                    {
                                                        artwork.review?.expert
                                                            .position
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.date}>
                                            {formatDate(
                                                artwork.review?.created_at ||
                                                    "",
                                            )}
                                        </div>
                                    </div>
                                    <p className={styles.description}>
                                        {artwork.review?.description
                                            ?.split("\n\n")
                                            .map((parapgraph, index) => (
                                                <p key={index}>{parapgraph}</p>
                                            ))}
                                    </p>
                                </>
                            )}
                            {requests?.length ? (
                                <>
                                    {isContentOpened && (
                                        <ReviewRequests
                                            reviewRequests={requests}
                                        />
                                    )}
                                </>
                            ) : (
                                ""
                            )}
                            {reviewRequests?.items.length ? (
                                <div className={styles.bottomContent}>
                                    <div>
                                        <Tooltip id="tooltip-pagintaion" />
                                        <div
                                            data-tooltip-content="Currently doesn`t work"
                                            data-tooltip-id="tooltip-pagintaion"
                                        >
                                            <QuantitySelector
                                                quantityPerPage={
                                                    requestsPerPage
                                                }
                                                setQuantityPerPage={
                                                    setRequestsPerPage
                                                }
                                                quantityPerPageVariants={
                                                    requestsPerPageVariants
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
                            ) : (
                                ""
                            )}
                            {!requests?.length && !artwork.review && (
                                <NotRecordsYet />
                            )}
                        </>
                    )}
                </>
            }
        </div>
    );
};

const mapState = () => {
    return {};
};
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
};
const connector = connect(mapState, mapDispatch);
export const ArtworkExpertHistory = connector(ArtworkExpertHistoryComponent);
