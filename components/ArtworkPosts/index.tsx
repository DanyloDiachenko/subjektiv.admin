"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./styles.module.scss";
import { ArtworkPostsProps } from "./module.props";
import { NotRecordsYet } from "../NotRecordsYet";
import { MainArtworkPostGetResponseDto } from "@/submodules/common-dto/api-client/main";
import { ArtworkPostsTable } from "../Tables/ArtworkPosts";

const returnTableOrNothingFound = (
    postsResponse: MainArtworkPostGetResponseDto,
) => {
    if (postsResponse.items.length) {
        return <ArtworkPostsTable postsResponse={postsResponse} />;
    } else {
        return <NotRecordsYet />;
    }
};

export const ArtworkPosts = ({
    postsResponse,
}: ArtworkPostsProps): JSX.Element => {
    const [isContentOpened, setIsContentOpened] = useState<boolean>(true);

    return (
        <div className={styles.card} id="artworkPosts">
            <div className={styles.cardHeader}>
                <div className={styles.leftColumn}>
                    <h2>Artwork Posts</h2>
                    {postsResponse.items.length ? (
                        <Image
                            src="/media/arrow-top.svg"
                            alt="arrow"
                            width="20"
                            height="21"
                            className={!isContentOpened ? styles.arrowDown : ""}
                            onClick={() => setIsContentOpened(!isContentOpened)}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
            {isContentOpened && returnTableOrNothingFound(postsResponse)}
        </div>
    );
};
