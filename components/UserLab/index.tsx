"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import styles from "./styles.module.scss";
import { Button } from "../UI/Button";
import { QuantitySelector } from "../UI/QuantitySelector";
import { ISelectVariant } from "../UI/Select/variant.interface";
import Pagination from "../UI/Pagination";
import { ReviewsTable } from "../Tables/Reviews";
import { Tooltip } from "../UI/Tootip";
import apiClient from "@/api/apiClient";
import { UserLabProps } from "./module.props";
import { MainArtworkReviewItemDto } from "@/submodules/common-dto/api-client/main";
import { NotRecordsYet } from "../NotRecordsYet";

export const UserLab = ({ username }: UserLabProps): JSX.Element => {
    const usersQuantityPerPageVariants: ISelectVariant[] = [
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

    const [reviews, setReviews] = useState<MainArtworkReviewItemDto[]>([]);
    const [reviewsPerPage, setReviewsPerPage] = useState<ISelectVariant>(
        usersQuantityPerPageVariants[0],
    );
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(2);
    const [isContentOpened, setIsContentOpened] = useState<boolean>(true);

    const getReviews = async () => {
        try {
            const response =
                await apiClient.main.artworkReview.artworkReviewControllerGet({
                    page: currentPage,
                    expertUsername: username,
                });

            if (response.items) {
                setReviews(response.items);
                setTotalPages(response.total_pages);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getReviews();
    }, [currentPage]);

    return (
        <div className={styles.card} id="lab">
            <div className={styles.cardHeader}>
                <div className={styles.leftColumn}>
                    <h2>Lab</h2>
                    <Image
                        src="/media/arrow-top.svg"
                        alt="arrow"
                        width="20"
                        height="21"
                        className={!isContentOpened ? styles.arrowDown : ""}
                        onClick={() => setIsContentOpened(!isContentOpened)}
                    />
                </div>
                {reviews.length ? (
                    <div className={styles.rightColumn}>
                        <Button
                            appearance="lightBlue"
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-collection-all"
                        >
                            All
                            <Tooltip id="tooltip-collection-all" />
                        </Button>
                        <Button
                            appearance="grey"
                            className={styles.buttonInactive}
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-collection-owned"
                        >
                            In Progress
                            <Tooltip id="tooltip-collection-owned" />
                        </Button>
                        <Button
                            appearance="grey"
                            className={styles.buttonInactive}
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-collection-cuorToken"
                        >
                            On Review
                            <Tooltip id="tooltip-collection-cuorToken" />
                        </Button>
                        <Button
                            appearance="grey"
                            className={styles.buttonInactive}
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-collection-sold"
                        >
                            Approved
                            <Tooltip id="tooltip-collection-sold" />
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </div>
            {isContentOpened && (
                <>
                    {reviews.length ? (
                        <>
                            <ReviewsTable reviews={reviews} />
                            <div className={styles.bottomContent}>
                                <div>
                                    <Tooltip id="tooltip-pagintaion" />
                                    <div
                                        data-tooltip-content="Currently doesn`t work"
                                        data-tooltip-id="tooltip-pagintaion"
                                    >
                                        <QuantitySelector
                                            quantityPerPage={reviewsPerPage}
                                            setQuantityPerPage={
                                                setReviewsPerPage
                                            }
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
                                    elementId="lab"
                                />
                            </div>
                        </>
                    ) : (
                        <NotRecordsYet />
                    )}
                </>
            )}
        </div>
    );
};
