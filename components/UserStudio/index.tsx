"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { Button } from "../UI/Button";
import { QuantitySelector } from "../UI/QuantitySelector";
import { ISelectVariant } from "../UI/Select/variant.interface";
import Pagination from "../UI/Pagination";
import { UserStudioTable } from "../Tables/UserStudio";
import { Tooltip } from "../UI/Tootip";
import apiClient from "@/api/apiClient";
import { UserStudioProps } from "./module.props";
import { ArtworkAdminItemDto } from "@/submodules/common-dto/api-client/main";
import { NotRecordsYet } from "../NotRecordsYet";

export const UserStudio = ({ authorId }: UserStudioProps): JSX.Element => {
    const usersQuantityPerPageVariants: ISelectVariant[] = [
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

    const [artworks, setArtworks] = useState<ArtworkAdminItemDto[]>([]);
    const [usersQuantityPerPage, setUserQuantityPerPage] =
        useState<ISelectVariant>(usersQuantityPerPageVariants[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isContentOpened, setIsContentOpened] = useState<boolean>(true);

    const getArtworksStudio = async () => {
        try {
            const response =
                await apiClient.main.adminArtwork.adminArtworkControllerGetArtworks(
                    {
                        page: currentPage,
                        authorId: authorId,
                    },
                );

            if (response.items) {
                setArtworks(response.items);
                setTotalPages(response.total_pages);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getArtworksStudio();
    }, [currentPage]);

    return (
        <div className={styles.card} id="studio">
            <div className={styles.cardHeader}>
                <div className={styles.leftColumn}>
                    <h2>Studio</h2>
                    <Image
                        src="/media/arrow-top.svg"
                        alt="arrow"
                        width="20"
                        height="21"
                        className={!isContentOpened ? styles.arrowDown : ""}
                        onClick={() => setIsContentOpened(!isContentOpened)}
                    />
                </div>
                {artworks.length ? (
                    <div className={styles.rightColumn}>
                        <Button
                            appearance="lightBlue"
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-all"
                        >
                            All
                            <Tooltip id="tooltip-all" />
                        </Button>
                        <Button
                            appearance="grey"
                            className={styles.buttonInactive}
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-available"
                        >
                            Available
                            <Tooltip id="tooltip-available" />
                        </Button>
                        <Button
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-sold"
                            appearance="grey"
                            className={styles.buttonInactive}
                        >
                            Sold
                            <Tooltip id="tooltip-sold" />
                        </Button>
                        <Button
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-inProgress"
                            appearance="grey"
                            className={styles.buttonInactive}
                        >
                            In Progress
                            <Tooltip id="tooltip-inProgress" />
                        </Button>
                        <Button
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-delivering"
                            appearance="grey"
                            className={styles.buttonInactive}
                        >
                            Delivering
                            <Tooltip id="tooltip-delivering" />
                        </Button>
                        <Button
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-notSelling"
                            appearance="grey"
                            className={styles.buttonInactive}
                        >
                            Not selling
                            <Tooltip id="tooltip-notSelling" />
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </div>
            {isContentOpened && (
                <>
                    {artworks.length ? (
                        <>
                            <UserStudioTable artworks={artworks} />
                            <div className={styles.bottomContent}>
                                <div>
                                    <Tooltip id="tooltip-pagintaion" />
                                    <div
                                        data-tooltip-content="Currently doesn`t work"
                                        data-tooltip-id="tooltip-pagintaion"
                                    >
                                        <QuantitySelector
                                            quantityPerPage={
                                                usersQuantityPerPage
                                            }
                                            setQuantityPerPage={
                                                setUserQuantityPerPage
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
                                    elementId="studio"
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
