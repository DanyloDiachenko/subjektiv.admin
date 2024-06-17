"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { ArtworkAdminItemDto } from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import useClickOutside from "@/helpers/useClickOutside";
import { getArtworkImage } from "@/helpers/getArtworkImage";
import { sliceTitle } from "@/helpers/sliceTitle";
import { ArtworkSelectorProps } from "./selector.props";

export const ArtworkSelector = ({
    artwork,
    setArtwork,
}: ArtworkSelectorProps): JSX.Element => {
    const selectRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(selectRef, () => setIsOpened(false));

    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [artworks, setArtworks] = useState<ArtworkAdminItemDto[]>([]);
    const [artworkInput, setArtworkInput] = useState<string>("");

    const getArtworks = async (search: string) => {
        try {
            const response =
                await apiClient.main.adminArtwork.adminArtworkControllerGetArtworks(
                    {
                        search: search || undefined,
                    },
                );

            setArtworks(response.items);
        } catch (error) {
            console.log("catch error getting artworks", error);
        }
    };

    useEffect(() => {
        getArtworks(artworkInput);
    }, [artworkInput]);

    const onArtworkClickHandler = (artwork: ArtworkAdminItemDto) => {
        setArtwork(artwork);

        setArtworkInput("");
        setIsOpened(false);
    };

    return (
        <div className={styles.selectWrapper} ref={selectRef}>
            <div
                className={styles.selectContent}
                onClick={() => setIsOpened(!isOpened)}
            >
                {artwork?.title ? (
                    <span className={styles.activeTitle}>
                        {sliceTitle(artwork?.title, 35)}
                    </span>
                ) : (
                    <span className={styles.placeholder}>Select Artwork</span>
                )}

                <Image
                    src="/media/arrow-select.svg"
                    alt="arrow"
                    width="12"
                    height="8"
                />
            </div>
            {isOpened && (
                <div className={styles.variants}>
                    <Input
                        value={artworkInput}
                        onChange={(e) => setArtworkInput(e.target.value)}
                        placeholder="Search artwork"
                    />
                    <ul>
                        {artworks.length ? (
                            artworks.map((artwork, index) => (
                                <li
                                    key={index}
                                    onClick={() =>
                                        onArtworkClickHandler(artwork)
                                    }
                                >
                                    <img
                                        src={getArtworkImage(
                                            artwork.id,
                                            artwork.main_image?.image_id || "",
                                        )}
                                        alt=""
                                    />
                                    {sliceTitle(artwork.title || "", 55)}
                                </li>
                            ))
                        ) : (
                            <li>Nothing Found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};
