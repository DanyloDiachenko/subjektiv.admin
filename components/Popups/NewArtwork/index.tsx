"use client";

import Image from "next/image";
import { useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { ArtworkStatusSelect } from "./ArtworkStatusSelect";
import { CreateArtworkPopupProps } from "./popup.props";
import {
    ArtWorkStatus,
    ArtworkImageDto,
    MainArtworkPostRequestDto,
} from "@/submodules/common-dto/api-client/main";
import { ArtworkCategorySelect } from "./ArtworkCategorySelect";
import apiClient from "@/api/apiClient";
import { IRootState } from "@/store";
import { Images } from "./Images";
import { AlternativeImages } from "./AlternativeImages";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { ImageRatioEnum } from "@/submodules/common-dto/api-client/storage";

const CreateArtworkPopupComponent = ({
    openPopup,
    closePopup,
    images,
    alternativeImages,
}: CreateArtworkPopupProps): JSX.Element => {
    const [deletedAlternativeImg, setDeletedAlternativeImg] = useState<
        ArtworkImageDto[]
    >([]);
    const [deletedImg, setDeletedImg] = useState<ArtworkImageDto[]>([]);

    const [fieldsToCreateArtwork, setFieldsToCreateArtwork] =
        useState<MainArtworkPostRequestDto>({
            status: undefined,
            title: "",
            /* author_id */
            category_id: -1,
            height: 0,
            width: 0,
            depth: 0,
            /* country */
            description: "",
        });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const setFieldsToCreateArtworkHandler = (
        field: string,
        value: string | number,
    ) => {
        setFieldsToCreateArtwork({
            ...fieldsToCreateArtwork,
            [field]: value,
        });
    };

    const onCategoryClickHandler = (categoryId: number) => {
        setFieldsToCreateArtworkHandler("category_id", categoryId);
    };

    const onStatusClick = (statusKey: ArtWorkStatus) => {
        setFieldsToCreateArtwork({
            ...fieldsToCreateArtwork,
            status: statusKey,
        });
    };

    const updateImages = async (artworkId: number) => {
        if (images.length === 0) {
            return;
        }

        const filteredImages = images.filter(
            (image) => image.side !== "alternative",
        );

        for (let i = 0; i < filteredImages.length; i++) {
            const imageToPost = filteredImages[i];
            try {
                if (!imageToPost.blob) return;

                const createdImage = await imageService.upload(
                    ImageTargetEnum.Artwork,
                    imageToPost.blob,
                    {
                        artworkId: artworkId,
                        ratio: imageToPost.ratio as unknown as ImageRatioEnum,
                    },
                );

                await apiClient.main.artworkImages.artworkImageControllerCreate(
                    {
                        requestBody: {
                            image_id: createdImage,
                            artwork_id: artworkId,
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

    console.log(alternativeImages);

    const updateAlternativeImages = async (artworkId: number) => {
        if (alternativeImages.length === 0) {
            return;
        }

        const filteredImages = alternativeImages.filter(
            (image) => image.side === "alternative",
        );

        for (let i = 0; i < filteredImages.length; i++) {
            const imageToPost = filteredImages[i];
            try {
                if (!imageToPost.blob) return;

                const createdImage = await imageService.upload(
                    ImageTargetEnum.Artwork,
                    imageToPost.blob,
                    {
                        artworkId: artworkId,
                        ratio: imageToPost.ratio as unknown as ImageRatioEnum,
                    },
                );

                await apiClient.main.artworkImages.artworkImageControllerCreate(
                    {
                        requestBody: {
                            image_id: createdImage,
                            artwork_id: artworkId,
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

    console.log(images);

    const submit = async () => {
        if (!fieldsToCreateArtwork) {
            return;
        }

        try {
            const response =
                await apiClient.main.artwork.artworkControllerCreateArtwork({
                    requestBody: fieldsToCreateArtwork,
                });

            if (response.success) {
                console.log(response);
                updateAlternativeImages(response.data.id);
                updateImages(response.data.id);
                closePopup();

                /* router.refresh();
                location.reload(); */
            }
        } catch (error: any) {
            console.log("catch error creating artwork", error);
            const responseError = error.response;

            if (responseError.message) {
                setErrorMessage(
                    responseError.message.charAt(0).toUpperCase() +
                        responseError.message.slice(1),
                );
            }
        }
    };

    const discard = () => {
        closePopup();
    };

    console.log(images);

    return (
        <>
            {openPopup === "newArtwork" && (
                <>
                    <div className={styles.popupBg} onClick={closePopup}></div>
                    <div className={styles.popup}>
                        <div className={styles.header}>
                            <div className={styles.title}>New Artwork</div>
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
                                        setDeletedAlternativeImg={
                                            setDeletedAlternativeImg
                                        }
                                        deletedAlternativeImg={
                                            deletedAlternativeImg
                                        }
                                    />
                                </div>
                            </div>
                            <label className={styles.label}>
                                <div className={styles.inputTitle}>Status</div>
                                <ArtworkStatusSelect
                                    status={fieldsToCreateArtwork.status || ""}
                                    onStatusClick={onStatusClick}
                                />
                            </label>
                            <label className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Artwork Name
                                </div>
                                <Input
                                    className={styles.input}
                                    placeholder="Artwork Name"
                                    value={fieldsToCreateArtwork.title}
                                    onChange={(e) => {
                                        setFieldsToCreateArtworkHandler(
                                            "title",
                                            e.target.value,
                                        );
                                    }}
                                />
                            </label>
                            <label className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Author ID
                                </div>
                                <Input
                                    className={`${styles.input} ${styles.inputDisabled}`}
                                    placeholder="Type Author ID"
                                    value=""
                                />
                            </label>
                            <label className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Category
                                </div>
                                <ArtworkCategorySelect
                                    onCategoryClick={onCategoryClickHandler}
                                />
                            </label>
                            <div className={styles.sizes}>
                                <label className={styles.label}>
                                    <div className={styles.inputTitle}>
                                        Height
                                    </div>
                                    <Input
                                        className={styles.input}
                                        placeholder="Height"
                                        value={fieldsToCreateArtwork.height}
                                        type="number"
                                        onChange={(e) => {
                                            setFieldsToCreateArtworkHandler(
                                                "height",
                                                Number(e.target.value),
                                            );
                                        }}
                                    />
                                </label>
                                <label className={styles.label}>
                                    <div className={styles.inputTitle}>
                                        Width
                                    </div>
                                    <Input
                                        className={styles.input}
                                        placeholder="Width"
                                        value={fieldsToCreateArtwork.width}
                                        type="number"
                                        onChange={(e) => {
                                            setFieldsToCreateArtworkHandler(
                                                "width",
                                                Number(e.target.value),
                                            );
                                        }}
                                    />
                                </label>
                                <label className={styles.label}>
                                    <div className={styles.inputTitle}>
                                        Depthy
                                    </div>
                                    <Input
                                        className={styles.input}
                                        placeholder="Depthy"
                                        value={fieldsToCreateArtwork.depth}
                                        type="number"
                                        onChange={(e) => {
                                            setFieldsToCreateArtworkHandler(
                                                "depth",
                                                Number(e.target.value),
                                            );
                                        }}
                                    />
                                </label>
                            </div>
                            {/* <label className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Current Location
                                </div>
                                <ArtworkLocationSelect />
                            </label> */}
                            <label className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Write the description
                                </div>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Description"
                                    value={
                                        fieldsToCreateArtwork.description || ""
                                    }
                                    onChange={(e) => {
                                        setFieldsToCreateArtworkHandler(
                                            "description",
                                            e.target.value,
                                        );
                                    }}
                                />
                            </label>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.error}>{errorMessage}</div>
                            <div className={styles.buttons}>
                                <Button appearance="grey" onClick={discard}>
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

export const CreateArtworkPopup = connector(CreateArtworkPopupComponent);
