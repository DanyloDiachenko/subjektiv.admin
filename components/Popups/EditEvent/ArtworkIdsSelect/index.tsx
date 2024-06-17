import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

import styles from "./styles.module.scss";
import useClickOutside from "@/helpers/useClickOutside";
import apiClient from "@/api/apiClient";
import { ArtworkAdminItemDto } from "@/submodules/common-dto/api-client/main";
import { ArtworkIdsSelectProps } from "./module.props";

export const ArtworkIdsSelect = ({
    artworkIds,
    onArtworkClick,
}: ArtworkIdsSelectProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [artworks, setArtworks] = useState<ArtworkAdminItemDto[]>([]);
    const [selectedArtworks, setSelectedArtworks] = useState<
        ArtworkAdminItemDto[]
    >([]);
    const [search, setSearch] = useState<string>("");

    console.log(selectedArtworks);

    const selectRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(selectRef, () => setIsOpened(false));

    const fetchArtworks = useCallback(async (search: string) => {
        try {
            const response =
                await apiClient.main.adminArtwork.adminArtworkControllerGetArtworks(
                    {
                        search: search.length > 3 ? search : undefined,
                    },
                );
            setArtworks(response.items);
        } catch (error) {
            console.error("Error in getting artworks", error);
        }
    }, []);

    useEffect(() => {
        if (search.length > 3 || search === "") {
            fetchArtworks(search);
        }
    }, [search, fetchArtworks]);

    useEffect(() => {
        if (!artworkIds.length) {
            setSelectedArtworks([]);
        }

        const fetchSelectedArtworks = async () => {
            try {
                const response =
                    await apiClient.main.adminArtwork.adminArtworkControllerGetArtworks(
                        {
                            artworkIds: artworkIds,
                        },
                    );
                setSelectedArtworks(response.items);
            } catch (error) {
                console.error("Error in getting selected artworks", error);
            }
        };

        if (artworkIds.length) {
            fetchSelectedArtworks();
        }
    }, [artworkIds]);

    const renderSelectedArtworks = () => (
        <div>{selectedArtworks.map((artwork) => artwork.title).join(", ")}</div>
    );

    return (
        <div className={styles.selectWrapper}>
            <div
                className={styles.selectContent}
                onClick={() => setIsOpened(!isOpened)}
            >
                {renderSelectedArtworks()}
                <Image
                    src="/media/arrow-select.svg"
                    alt="arrow"
                    width="12"
                    height="8"
                />
            </div>
            {isOpened && (
                <div className={styles.variants} ref={selectRef}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles.input}
                        placeholder="Search artworks"
                    />
                    <ul>
                        {artworks.map((artwork) => (
                            <li
                                key={artwork.id}
                                className="d-flex align-items-center justify-content-between"
                            >
                                <div onClick={() => onArtworkClick(artwork)}>
                                    {artwork.title}
                                </div>
                                {artworkIds.includes(artwork.id) && (
                                    <button
                                        onClick={() => onArtworkClick(artwork)}
                                        className={styles.buttonRemove}
                                    >
                                        x
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
