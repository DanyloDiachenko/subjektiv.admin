"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "../UI/Button";
import styles from "./styles.module.scss";
import { ArtworkActionPanelProps } from "./artworkActionPanel.props";
import apiClient from "@/api/apiClient";
import { connect } from "react-redux";
import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main";
import { ModerateArtworkPopup } from "../Popups/ModerateArtwork";

const ArtworkActionPanelComponent = ({
    artwork,
    setArtworksToModerate,
    closePopup,
    setOpenPopup,
}: ArtworkActionPanelProps): JSX.Element => {
    const router = useRouter();

    /* const [isArtworkAcitve, setIsArtworkActive] = useState<boolean>(
        artwork.is_active,
    ); */
    const [editedArtwork, setEditedArtwork] =
        useState<MainAdminArtworkGetIdResponseDto>(artwork);

    useEffect(() => {
        setEditedArtwork(artwork);
    }, [artwork.id]);

    /* const onArtworkActiveChange = async (newActiveValue: boolean) => {
        setIsArtworkActive(newActiveValue);

        try {
            await apiClient.main.adminArtwork.adminArtworkControllerUpdateArtwork(
                {
                    id: artwork.id,
                    requestBody: {
                        is_active: newActiveValue,
                    },
                },
            );
        } catch (error) {
            console.log(error);
        }
    }; */

    const onRestoreClick = async () => {
        /* setOpenPopup("submitDeletePopup"); */
        /* try {
            await apiClient.main.artwork.artworkControllerDeleteArtwork({
                id: artwork.id,
            });

            router.back();
        } catch (error) {
            console.log(error);
        } */
        try {
            await apiClient.main.artwork.artworkControllerUpdateArtwork({
                id: artwork.id,
                requestBody: {
                    is_active: true,
                },
            });

            router.back();
        } catch (error) {
            console.log(error);
        }
    };

    const confirmModerateArtwork = async () => {
        if (!editedArtwork) return;

        try {
            const response =
                await apiClient.main.adminArtwork.adminArtworkControllerUpdateArtwork(
                    {
                        id: editedArtwork.id,
                        requestBody: {
                            is_moderated: editedArtwork.is_moderated,
                            is_public: editedArtwork.is_public,
                            is_active: editedArtwork.is_active,
                        },
                    },
                );
            if (response.success) {
                closePopup();
                location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onReasonClick = (reasonTitle: string) => {
        if (!editedArtwork) {
            return;
        }

        switch (reasonTitle) {
            case "All Good (by default)": {
                setEditedArtwork({
                    ...editedArtwork,
                    is_moderated: true,
                    is_public: true,
                    is_active: true,
                });
                break;
            }
            case "Reject": {
                setEditedArtwork({
                    ...editedArtwork,
                    is_moderated: true,
                    is_public: false,
                    is_active: false,
                });
                break;
            }
            case "Not public": {
                setEditedArtwork({
                    ...editedArtwork,
                    is_moderated: true,
                    is_public: false,
                    is_active: true,
                });
                break;
            }
        }
    };

    return (
        <>
            {editedArtwork.id && (
                <ModerateArtworkPopup
                    artwork={editedArtwork}
                    onReasonClick={onReasonClick}
                    confirm={confirmModerateArtwork}
                    totalArtworks={1}
                    currentArtworkIndex={1}
                    skip={closePopup}
                />
            )}
            <div className={`card mb-5 mb-xl-8 ${styles.card}`}>
                <div className={`card-header border-0 ${styles.cardHeader}`}>
                    <div className="card-title">
                        <h3 className="fw-bold m-0">
                            Action Panel Description
                        </h3>
                    </div>
                </div>
                <div className={`card-body ${styles.cardBody}`}>
                    <div className={styles.settings}>
                        {/* <div className={styles.item}>
                            <div className={styles.leftColumn}>
                                <Image
                                    src="/media/accessibility.svg"
                                    alt="accessibility"
                                    width="24"
                                    height="24"
                                />
                                <div className={styles.title}>
                                    Accessibility
                                </div>
                            </div>
                            <Switch
                                isChecked={isArtworkAcitve}
                                onChange={onArtworkActiveChange}
                            />
                        </div> */}
                        {!artwork.is_active && (
                            <div className={styles.item}>
                                <div className={styles.leftColumn}>
                                    <Image
                                        src="/media/deleteArtwork.svg"
                                        alt="user"
                                        width="24"
                                        height="24"
                                    />
                                    <div className={styles.title}>
                                        Is Active
                                    </div>
                                </div>
                                <Button
                                    className={styles.button}
                                    appearance="blue"
                                    onClick={onRestoreClick}
                                >
                                    Restore
                                </Button>
                            </div>
                        )}
                        <div className={styles.item}>
                            <div className={styles.leftColumn}>
                                <Image
                                    src="/media/shield.svg"
                                    alt="shield"
                                    width="24"
                                    height="24"
                                />
                                <div className={styles.title}>Moderation</div>
                            </div>
                            <Button
                                className={styles.button}
                                appearance="grey"
                                onClick={() => {
                                    setOpenPopup("moderateArtwork");
                                    setArtworksToModerate([artwork.id]);
                                }}
                            >
                                Moderate
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapState = () => ({});
const mapDispatch = {
    closePopup: () => ({
        type: "CLOSE_POPUP",
    }),
    setArtworksToModerate: (artworksToModerate: number[]) => ({
        type: "SET_ARTWORKS_TO_MODERATE",
        artworksToModerate,
    }),
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
};

const connector = connect(mapState, mapDispatch);

export const ArtworkActionPanel = connector(ArtworkActionPanelComponent);
