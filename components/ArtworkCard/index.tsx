/* import Image from "next/image";

import styles from "./styles.module.scss";
import { ArtworkPhotoCardProps } from "./module.props";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";

const ArtworkPhotoCard = ({ artwork }: ArtworkPhotoCardProps): JSX.Element => {
    return (
        <div className={`card mb-5 mb-xl-8 ${styles.card}`}>
            <img
                src={imageService.getUrl(
                    ImageTargetEnum.Artwork,
                    { artworkId: artwork.id },
                    artwork.main_image ? artwork.main_image.image_id : "",
                    "small"
                )}
                alt="artwork photo"
            />
        </div>
    );
};

export default ArtworkPhotoCard; */

import React from "react";

import styles from "./styles.module.scss";
import { ArtworkPhotoCardProps } from "./module.props";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { connect } from "react-redux";

const ArtworkPhotoCardComponent = ({
    artwork,
    setImagePopup,
    setOpenPopup,
}: ArtworkPhotoCardProps): JSX.Element => {
    const getImageUrl = () => {
        return imageService.getUrl(
            ImageTargetEnum.Artwork,
            { artworkId: artwork.id },
            artwork.main_image ? artwork.main_image.image_id : "",
            "small",
        );
    };

    return (
        <div className={`card mb-5 mb-xl-8 ${styles.card}`}>
            <img
                src={getImageUrl()}
                alt="artwork photo"
                onClick={() => {
                    setOpenPopup("imagePopup");
                    setImagePopup(getImageUrl());
                }}
            />
        </div>
    );
};

const mapState = () => ({});
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
    setImagePopup: (imageSrc: string) => ({
        type: "SET_IMAGE_POPUP",
        imageSrc,
    }),
};

const connector = connect(mapState, mapDispatch);

const ArtworkPhotoCard = connector(ArtworkPhotoCardComponent);

export default ArtworkPhotoCard;
