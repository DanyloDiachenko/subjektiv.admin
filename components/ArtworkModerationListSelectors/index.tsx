"use client";

import Image from "next/image";

import styles from "./styles.module.scss";
import { Button } from "../UI/Button";
import { Select } from "../UI/Select";
import { ArtworkModerationListSelectorsModuleProps } from "./module.props";
import { IRootState } from "@/store";
import { connect } from "react-redux";

const ArtworkModerationListSelectorsComponent = ({
    categories,
    category,
    setCategory,
    moderationStatus,
    moderationStatuses,
    setModertionStatus,
    onModerateClick,
    artworksToModerate,
    setOpenPopup,
}: ArtworkModerationListSelectorsModuleProps): JSX.Element => {
    const onModerateClickHandler = () => {
        setOpenPopup("moderateArtwork");
        onModerateClick();
    };

    return (
        <div className="card-toolbar">
            <div className={`d-flex justify-content-end ${styles.wrapper}`}>
                <Select
                    placeholder="Category"
                    activeVariant={category}
                    setActiveVariant={setCategory}
                    variants={categories}
                    className={styles.category}
                />
                <Select
                    placeholder="Moderation Status"
                    activeVariant={moderationStatus}
                    setActiveVariant={setModertionStatus}
                    variants={moderationStatuses}
                    className={styles.artworkStatus}
                />
                {/* <Select
                    placeholder='Year'
                    activeVariant={null}
                    setActiveVariant={() => {}}
                    variants={selectVariants}
                    className={styles.year}
                /> */}
                <Button
                    appearance="blue"
                    className={`${styles.newArtworkButton} ${
                        artworksToModerate.length > 0
                            ? styles.active
                            : styles.inactive
                    }`}
                    disabled={artworksToModerate.length < 0}
                    onClick={
                        artworksToModerate.length > 0
                            ? onModerateClickHandler
                            : () => {}
                    }
                >
                    <Image
                        src="/media/double-check.svg"
                        alt="plus"
                        width="18"
                        height="18"
                    />
                    <span>Image Moderation</span>
                </Button>
            </div>
        </div>
    );
};

const mapState = (state: IRootState) => ({
    artworksToModerate: state.artworksToModerate.artworksToModerate,
});
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
};

const connector = connect(mapState, mapDispatch);

export const ArtworkModerationListSelectors = connector(
    ArtworkModerationListSelectorsComponent,
);
