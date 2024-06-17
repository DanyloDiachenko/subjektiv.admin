import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { IEditMediaStore } from "@/store/editMedia/initStore";
import { ArtworkImageDto } from "@/submodules/common-dto/api-client/main";
import { IPhoto } from "@/store/uploadPhoto/initStore";
import { ImagesProps } from "./module.props";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ImageRatioEnum } from "@/submodules/common-dto/api-client/storage";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { IArtworkStore } from "@/store/artwork/initStore";

const ImagesComponent = ({
    setOpenPopup,
    setUploadPhoto,
    artwork,
    images,
    setImages,
    deletedImg,
    setDeletedImg,
}: ImagesProps) => {
    const handleImageChange =
        (side: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                setOpenPopup("adjustImage");
                setUploadPhoto({
                    urlPhoto: URL.createObjectURL(e.target.files[0]),
                    side,
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
    const deleteImages = (imageId: string) => {
        const newImageArray = images!.filter(
            (image) => image.image_id !== imageId,
        );
        const deletedImageArray = images!.filter(
            (image) => image.image_id === imageId,
        );

        setDeletedImg([...deletedImg!, ...deletedImageArray]);
        setImages([...newImageArray]);
    };
    useEffect(() => {
        if (images?.length === 0) {
            setImages(artwork!.artwork_images!);
        }
    }, []);
    const renderImage = (side: string, label: string) => {
        const image = images?.find((img) => img.side === side);
        const inputRef = useRef<HTMLInputElement | null>(null);

        const handleChangeClick = () => {
            if (inputRef.current) {
                inputRef.current.click();
            }
        };

        return (
            <>
                {image ? (
                    <div className={styles.item}>
                        <div className={styles.itemTitle}>{label}</div>
                        <div className={styles.image}>
                            <img
                                src="/media/info-media.svg"
                                alt=""
                                className={styles.info}
                            />
                            <img
                                src={imageService.getUrl(
                                    ImageTargetEnum.Artwork,
                                    {
                                        artworkId: artwork!.id,
                                    },
                                    image.image_id,
                                    "small",
                                )}
                                alt="media"
                            />
                            <label htmlFor={`avatar-${side}`}>
                                <input
                                    type="file"
                                    id={`avatar-${side}`}
                                    ref={inputRef}
                                    className={styles.inputFile}
                                    style={{ display: "none" }}
                                    onChange={handleImageChange(side)}
                                />
                                <button
                                    onClick={handleChangeClick}
                                    className={`${styles.imageButton} ${styles.editButton}`}
                                >
                                    <Image
                                        src="/media/edit-profile.svg"
                                        alt="edit image photo"
                                        width="16"
                                        height="16"
                                    />
                                </button>
                            </label>
                            <button
                                className={`${styles.imageButton} ${styles.clearButton}`}
                                onClick={() => deleteImages(image.image_id)}
                            >
                                <Image
                                    src="/media/close-image-profile.svg"
                                    alt="remove photo"
                                    width="16"
                                    height="16"
                                />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={styles.itemTitle}>{label}</div>
                        <label htmlFor={`add-${side}-image`}>
                            <div
                                id={`add-${side}-image`}
                                className={styles.add}
                                onClick={handleChangeClick}
                            >
                                +
                            </div>
                            <input
                                type="file"
                                id={`avatar-${side}`}
                                ref={inputRef}
                                style={{ display: "none" }}
                                onChange={handleImageChange(side)}
                                accept=".png"
                            />
                        </label>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className={styles.content}>
            {renderImage("front", "Front side")}
            {renderImage("back", "Back side")}
            {renderImage("left", "Left side")}
            {renderImage("right", "Right side")}
        </div>
    );
};

const mapState = (state: {
    editMedia: IEditMediaStore;
    artwork: IArtworkStore;
}) => {
    return {
        // artwork: state.artwork.artwork,
        images: state.editMedia.images,
    };
};
const mapDispatch = {
    setImages: (images: ArtworkImageDto[]) => ({
        type: "SET_IMAGES",
        images,
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
export const Images = connector(ImagesComponent);
