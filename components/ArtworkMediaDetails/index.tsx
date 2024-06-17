"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./styles.module.scss";
import { Button } from "../UI/Button";
import { ArtworkMediaDetailsTable } from "../Tables/ArtworkMediaDetails";
import { ArtworkMediaDetailsProps } from "./module.props";
import { connect } from "react-redux";
import { NotRecordsYet } from "../NotRecordsYet";
import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

const returnTableOrNothingFound = (
    artwork: MainAdminArtworkGetIdResponseDto,
) => {
    if (artwork.artwork_images.length) {
        return <ArtworkMediaDetailsTable artwork={artwork} />;
    } else {
        return <NotRecordsYet />;
    }
};

const ArtworkMediaDetailsComponent = ({
    artwork,
    setOpenPopup,
    setImagesPopupType,
}: ArtworkMediaDetailsProps): JSX.Element => {
    const [isContentOpened, setIsContentOpened] = useState<boolean>(true);

    return (
        <div className={styles.card} id="mediaDetails">
            <div className={styles.cardHeader}>
                <div className={styles.leftColumn}>
                    <h2>Media Details</h2>
                    <Image
                        src="/media/arrow-top.svg"
                        alt="arrow"
                        width="20"
                        height="21"
                        className={!isContentOpened ? styles.arrowDown : ""}
                        onClick={() => setIsContentOpened(!isContentOpened)}
                    />
                </div>
                <div className={styles.rightColumn}>
                    <Button
                        appearance="lightBlue"
                        className={styles.editButton}
                        onClick={() => {
                            setOpenPopup("editMedia");
                            setImagesPopupType("editMedia");
                        }}
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
            </div>
            {isContentOpened && returnTableOrNothingFound(artwork)}
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
    setImagesPopupType: (imagesPopupType: "" | "editMedia" | "newArtwork") => ({
        type: "SET_IMAGES_POPUP_TYPE",
        imagesPopupType,
    }),
};
const connector = connect(mapState, mapDispatch);

export const ArtworkMediaDetails = connector(ArtworkMediaDetailsComponent);
