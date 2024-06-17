"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./styles.module.scss";
import { ArtworkPurchaseInfoProps } from "./module.props";
import { NotRecordsYet } from "../NotRecordsYet";
import { MainArtworkOrderGetResponseDto } from "@/submodules/common-dto/api-client/main";
import { ArtworkOrders } from "../Tables/ArtworkOrders";

const returnTableOrNothingFound = (
    ordersResponse: MainArtworkOrderGetResponseDto,
) => {
    if (ordersResponse.items.length) {
        return <ArtworkOrders ordersResponse={ordersResponse} />;
    } else {
        return <NotRecordsYet />;
    }
};

export const ArtworkPurchaseInfo = ({
    ordersResponse,
}: ArtworkPurchaseInfoProps): JSX.Element => {
    const [isContentOpened, setIsContentOpened] = useState<boolean>(true);

    return (
        <div className={styles.card} id="mediaDetails">
            <div className={styles.cardHeader}>
                <div className={styles.leftColumn}>
                    <h2>Purchase Info</h2>
                    <Image
                        src="/media/arrow-top.svg"
                        alt="arrow"
                        width="20"
                        height="21"
                        className={!isContentOpened ? styles.arrowDown : ""}
                        onClick={() => setIsContentOpened(!isContentOpened)}
                    />
                </div>
                <div className={styles.rightColumn}></div>
            </div>
            {isContentOpened && returnTableOrNothingFound(ordersResponse)}
        </div>
    );
};
