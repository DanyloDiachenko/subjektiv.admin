"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import styles from "./styles.module.scss";
import { Button } from "../UI/Button";
import { QuantitySelector } from "../UI/QuantitySelector";
import { ISelectVariant } from "../UI/Select/variant.interface";
import Pagination from "../UI/Pagination";
import { UserCollectionTable } from "../Tables/UserCollection";
import { Tooltip } from "../UI/Tootip";
import apiClient from "@/api/apiClient";
import { UserCollectionProps } from "./module.props";
import { ArtworkAdminItemDto } from "@/submodules/common-dto/api-client/main";
import { NotRecordsYet } from "../NotRecordsYet";

export const UserCollection = ({
    username,
}: UserCollectionProps): JSX.Element => {
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

    const [artworks, setArtworks] = useState<ArtworkAdminItemDto[]>([]);
    const [usersQuantityPerPage, setUserQuantityPerPage] =
        useState<ISelectVariant>(usersQuantityPerPageVariants[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(2);
    const [isContentOpened, setIsContentOpened] = useState<boolean>(true);

    const getArtworksCollection = async () => {
        try {
            const response =
                await apiClient.main.adminArtwork.adminArtworkControllerGetArtworks(
                    {
                        page: currentPage,
                        ownerUserName: username,
                        artistUserNameNot: username,
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
        getArtworksCollection();
    }, [currentPage]);

    return (
        <div className={styles.card} id="collection">
            <div className={styles.cardHeader}>
                <div className={styles.leftColumn}>
                    <h2>Collection</h2>
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
                            Owned
                            <Tooltip id="tooltip-collection-owned" />
                        </Button>
                        <Button
                            appearance="grey"
                            className={styles.buttonInactive}
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-collection-cuorToken"
                        >
                            Cuor Token
                            <Tooltip id="tooltip-collection-cuorToken" />
                        </Button>
                        <Button
                            appearance="grey"
                            className={styles.buttonInactive}
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id="tooltip-collection-sold"
                        >
                            Sold
                            <Tooltip id="tooltip-collection-sold" />
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
                            <UserCollectionTable artworks={artworks} />
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
                                    elementId="collection"
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
