"use client";

import Image from "next/image";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "../UI/Button";
import { Select } from "../UI/Select";
import { ArtworkListSelectorsProps } from "./module.props";

const ArtworkListSelectorsComponent = ({
    setOpenPopup,
    setImagesPopupType,
    artworkStatuses,
    categories,
    category,
    setCategory,
    artworkStatus,
    setArtworkStatus,
    year,
    years,
    setYear,
    price,
    prices,
    setPrice,
}: ArtworkListSelectorsProps): JSX.Element => {
    return (
        <div className="card-toolbar">
            <div className={`${styles.wrapper}`}>
                <Select
                    placeholder="Category"
                    activeVariant={category}
                    setActiveVariant={(category) => {
                        setCategory(category);
                    }}
                    variants={categories}
                    className={styles.category}
                />
                <Select
                    placeholder="Artwork Status"
                    activeVariant={artworkStatus}
                    setActiveVariant={(artStatus) => {
                        setArtworkStatus(artStatus);
                    }}
                    variants={artworkStatuses}
                    className={styles.artworkStatus}
                />
                <Select
                    placeholder="Price"
                    activeVariant={price}
                    setActiveVariant={setPrice}
                    variants={prices}
                    className={styles.price}
                />
                <Select
                    placeholder="Year"
                    activeVariant={year}
                    setActiveVariant={setYear}
                    variants={years}
                    className={styles.year}
                />
                <Button
                    appearance="blue"
                    className={styles.newArtworkButton}
                    onClick={() => {
                        setOpenPopup("newArtwork");
                        setImagesPopupType("newArtwork");
                    }}
                >
                    <span className={styles.plus}>
                        <Image
                            src="/media/plus.svg"
                            alt="plus"
                            width="18"
                            height="18"
                        />
                    </span>
                    <span>New Artwork</span>
                </Button>
            </div>
        </div>
    );
};

const mapState = () => ({});
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

export const ArtworkListSelectors = connector(ArtworkListSelectorsComponent);
