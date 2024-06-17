import styles from "./styles.module.scss";
import { AlternativeImagesProps } from "./module.props";
import Image from "next/image";
import { IEditMediaStore } from "@/store/editMedia/initStore";
import { ArtworkImageDto } from "@/submodules/common-dto/api-client/main";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { IPhoto } from "@/store/uploadPhoto/initStore";
import { ImageRatioEnum } from "@/submodules/common-dto/api-client/storage";

const AlternativeImagesComponent = ({
    alternativeImages,
    setAlternativeImages,
    setOpenPopup,
    setUploadPhoto,
    setDeletedAlternativeImg,
    deletedAlternativeImg,
}: AlternativeImagesProps) => {
    const [allImages, setAllImages] = useState<ArtworkImageDto[]>([]);
    const deleteAlternativeImage = (clickedImageId: string) => {
        const filteredImages = allImages.filter(
            ({ image_id }) => image_id !== clickedImageId,
        );
        const deletedImages = allImages.filter(
            ({ image_id }) => image_id === clickedImageId,
        );

        setDeletedAlternativeImg([...deletedAlternativeImg, ...deletedImages]);
        setAllImages(filteredImages);
    };

    const alternativeImageRef = useRef<HTMLInputElement | null>(null);
    const onAlternativeImageAddClick = () => {
        if (alternativeImageRef.current) {
            alternativeImageRef.current.click();
        }
    };

    const addAlternativeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setOpenPopup("adjustImage");
            setUploadPhoto({
                urlPhoto: URL.createObjectURL(e.target.files[0]),
                side: "alternative",
                currentRatio: {
                    title: "1:1",
                    field: ImageRatioEnum.RATIO_1_1,
                },
                file: e.target.files[0],
                format: "png",
            });

            e.target.value = "";
        }
    };
    useEffect(() => {
        const filteredImg = alternativeImages.filter(
            (value) => !deletedAlternativeImg.includes(value),
        );

        setAlternativeImages([...filteredImg]);
    }, [deletedAlternativeImg]);

    useEffect(() => {
        const filteredAlternativeImg = alternativeImages.filter(
            (value) => !deletedAlternativeImg.includes(value),
        );

        const filteredAllImg = allImages.filter(
            (value) => !deletedAlternativeImg.includes(value),
        );
        const combinedSet = new Set([
            ...filteredAllImg,
            ...filteredAlternativeImg,
        ]);
        const combinedArray = Array.from(combinedSet);
        setAllImages([...combinedArray]);
    }, [alternativeImages]);

    return (
        <>
            {allImages.map((image, index) => (
                <div key={index} className={styles.item}>
                    <div className={styles.image}>
                        <img src={image.image_id} alt="" />
                        <button
                            className={`${styles.imageButton} ${styles.clearButton}`}
                            onClick={() => {
                                deleteAlternativeImage(image.image_id);
                            }}
                        >
                            <Image
                                src="/media/close-image-profile.svg"
                                alt="clear user photo"
                                width="16"
                                height="16"
                            />
                        </button>
                    </div>
                </div>
            ))}
            <label
                htmlFor="add-alternative-image
                                        "
            >
                <div
                    id="add-alternative-image"
                    className={styles.add}
                    onClick={onAlternativeImageAddClick}
                >
                    +
                </div>
                <input
                    type="file"
                    id="avatar"
                    ref={alternativeImageRef}
                    style={{ display: "none" }}
                    onChange={addAlternativeImage}
                    accept=".png"
                />
            </label>
        </>
    );
};

const mapState = (state: { editMedia: IEditMediaStore }) => {
    return {
        alternativeImages: state.editMedia.alternativeImages,
    };
};
const mapDispatch = {
    setAlternativeImages: (alternativeImages: ArtworkImageDto[]) => ({
        type: "SET_ALTERNATIVE_IMAGES",
        alternativeImages,
    }),
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
    setUploadPhoto: (uploadPhoto: IPhoto) => ({
        type: "UPLOAD_PHOTO",
        uploadPhoto,
    }),
};

const connector = connect(mapState, mapDispatch);
export const AlternativeImages = connector(AlternativeImagesComponent);
