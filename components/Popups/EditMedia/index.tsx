"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";
import { IRootState } from "@/store";
import { EditMediaPopupProps } from "./popup.props";
import {
    ArtworkImageDto,
    MainAdminArtworkGetIdResponseDto,
} from "@/submodules/common-dto/api-client/main";
import { AlternativeImages } from "./AlternativeImages";
import { Images } from "./Images";
import apiClient from "@/api/apiClient";
import { useParams } from "next/navigation";

const EditMediaPopupComponent = ({
    openPopup,
    closePopup,
    images,
    alternativeImages,
}: EditMediaPopupProps): JSX.Element => {
    const params = useParams();

    const [artwork, setArtwork] = useState<MainAdminArtworkGetIdResponseDto>();
    const [deletedAlternativeImg, setDeletedAlternativeImg] = useState<
        ArtworkImageDto[]
    >([]);
    const [deletedImg, setDeletedImg] = useState<ArtworkImageDto[]>([]);

    const deleteImages = async () => {
        if (deletedImg.length === 0) {
            return;
        }
        for (let i = 0; i < deletedImg.length; i++) {
            const imageToDelete = deletedImg[i];
            try {
                await apiClient.main.artworkImages.artworkImageControllerDelete(
                    {
                        id: imageToDelete.id,
                    },
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    const deleteAlternativeImages = async () => {
        if (deletedAlternativeImg.length === 0) {
            return;
        }
        for (let i = 0; i < deletedAlternativeImg.length; i++) {
            const alternativeImageToDelete = deletedAlternativeImg[i];
            try {
                await apiClient.main.artworkImages.artworkImageControllerDelete(
                    {
                        id: alternativeImageToDelete.id,
                    },
                );
            } catch (error) {
                console.log(error);
            }
        }
    };
    const updateImages = async () => {
        if (images.length === 0) {
            return;
        }
        const filteredImages = images.filter(
            (image) => image.side !== "alternative",
        );

        for (let i = 0; i < filteredImages.length; i++) {
            const imageToPost = filteredImages[i];
            try {
                await apiClient.main.artworkImages.artworkImageControllerCreate(
                    {
                        requestBody: {
                            image_id: imageToPost.image_id,
                            artwork_id: imageToPost.artwork_id,
                            side: imageToPost.side,
                            ratio: imageToPost.ratio,
                        },
                    },
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    const updateAlternativeImages = async () => {
        if (alternativeImages.length === 0) {
            return;
        }

        for (let i = 0; i < alternativeImages.length; i++) {
            const alternativeImageToPost = alternativeImages[i];
            try {
                await apiClient.main.artworkImages.artworkImageControllerCreate(
                    {
                        requestBody: {
                            image_id: alternativeImageToPost.image_id,
                            artwork_id: alternativeImageToPost.artwork_id,
                            side: alternativeImageToPost.side,
                            ratio: alternativeImageToPost.ratio,
                        },
                    },
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    const submit = () => {
        deleteImages();
        updateImages();

        deleteAlternativeImages();
        updateAlternativeImages();
    };

    useEffect(() => {
        apiClient.main.adminArtwork
            .adminArtworkControllerGetArtwork({ id: Number(params.id) })
            .then((response) => {
                setArtwork(response);
            });
    }, []);

    if (!artwork) {
        return <></>;
    }

    console.log(images);

    return (
        <>
            {openPopup === "editMedia" && (
                <>
                    <div className={styles.popupBg} onClick={closePopup}></div>
                    <div className={styles.popup}>
                        <div className={styles.header}>
                            <div className={styles.title}>Edit Media</div>
                            <button
                                className={styles.buttonClose}
                                onClick={closePopup}
                            >
                                <Image
                                    src="/media/close.svg"
                                    alt="close"
                                    width="10"
                                    height="10"
                                />
                            </button>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.mainImages}>
                                <div className={styles.title}>Images</div>
                                <Images
                                    artwork={artwork!}
                                    setArtwork={setArtwork}
                                    deletedImg={deletedImg}
                                    setDeletedImg={setDeletedImg}
                                />
                            </div>

                            <div className={styles.additionalImages}>
                                <div className={styles.title}>
                                    Additional photo (optional)
                                </div>
                                <p>File types: png. Max Size: 10.6 MB</p>
                                <div className={styles.content}>
                                    <AlternativeImages
                                        artworkId={artwork.id}
                                        artwork={artwork!}
                                        setDeletedAlternativeImg={
                                            setDeletedAlternativeImg
                                        }
                                        deletedAlternativeImg={
                                            deletedAlternativeImg
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.error}>
                                {/* test error message */}
                            </div>
                            <div className={styles.buttons}>
                                <Button appearance="grey" onClick={closePopup}>
                                    Discard
                                </Button>
                                <Button appearance="blue" onClick={submit}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

const mapState = (state: IRootState) => ({
    openPopup: state.openPopup.openPopup,
    images: state.editMedia.images,
    alternativeImages: state.editMedia.alternativeImages,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const EditMediaPopup = connector(EditMediaPopupComponent);
