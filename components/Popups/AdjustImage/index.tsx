"use client";
import { IPopupStore } from "@/store/popup/initStore";
import { connect } from "react-redux";
import { AdjustImagePopupProps } from "./module.props";
import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    Crop,
    makeAspectCrop,
    PixelCrop,
} from "react-image-crop";
import {
    ArtWorkImageRatio,
    ArtWorkImageSide,
    ImageRatioEnum,
} from "@/submodules/common-dto/api-client/main";
import { SyntheticEvent, useRef, useState } from "react";
import { IEditMediaStore } from "@/store/editMedia/initStore";
import { IPhoto, IUploadProps } from "@/store/uploadPhoto/initStore";
import { OneToOne } from "@/components/UI/Icons/Ratios/OneToOne";
import { ThreeToFour } from "@/components/UI/Icons/Ratios/ThreeToFour";
import { NineToSixteen } from "@/components/UI/Icons/Ratios/NineToSixteen";
import { FourToThree } from "@/components/UI/Icons/Ratios/FourToThree";
import { SixteenToNine } from "@/components/UI/Icons/Ratios/SixteenToNine";
import { TwoToThree } from "@/components/UI/Icons/Ratios/TwoToThree";
import { ThreeToTwo } from "@/components/UI/Icons/Ratios/ThreeToTwo";
import { IArtworkStore } from "@/store/artwork/initStore";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";

const AdjustImageComponentPopup = ({
    openPopup,
    closePopup,
    setOpenPopup,
    uploadPhoto,
    setUploadPhoto,
    setAlternativeImages,
    alternativeImages,
    setImages,
    images,
    imagesPopupType,
    artwork,
}: AdjustImagePopupProps): JSX.Element => {
    const aspectRatio = [
        {
            title: "1:1",
            ratio: 1,
            icon: <OneToOne />,
            field: ImageRatioEnum.RATIO_1_1,
        },
        {
            title: "3:4",
            ratio: 3 / 4,
            icon: <ThreeToFour />,
            field: ImageRatioEnum.RATIO_3_4,
        },
        {
            title: "9:16",
            ratio: 9 / 16,
            icon: <NineToSixteen />,
            field: ImageRatioEnum.RATIO_9_16,
        },
        {
            title: "4:3",
            ratio: 4 / 3,
            icon: <FourToThree />,
            field: ImageRatioEnum.RATIO_4_3,
        },
        {
            title: "16:9",
            ratio: 16 / 9,
            icon: <SixteenToNine />,
            field: ImageRatioEnum.RATIO_16_9,
        },
        {
            title: "2:3",
            ratio: 2 / 3,
            icon: <TwoToThree />,
            field: ImageRatioEnum.RATIO_2_3,
        },
        {
            title: "3:2",
            ratio: 3 / 2,
            icon: <ThreeToTwo />,
            field: ImageRatioEnum.RATIO_3_2,
        },
    ];
    const imgReference = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [scale, setScale] = useState(1);
    const [rotate, _] = useState(0);
    const [aspect, setAspect] = useState<number | undefined>(1);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isPictureWide, setIsPictureWide] = useState(false);

    const closePopupHandler = () => {
        setAspect(1 / 1);
        setScale(1);
        closePopup();
    };

    const goBack = () => {
        setAspect(1 / 1);
        setScale(1);
        setOpenPopup(imagesPopupType);
    };

    const centerAspectCrop = (
        mediaWidth: number,
        mediaHeight: number,
        aspect: number,
    ) => {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: "%",
                    width: 100,
                },
                aspect,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        );
    };

    const b64toBlob = (b64Data: string, contentType = "image/jpeg"): Blob => {
        /*  console.log(b64Data); */
        const byteString: string = atob(
            b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""),
        );

        const ia: Uint8Array = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++)
            ia[Number.parseInt(`${i}`)] = byteString.codePointAt(i) || 0;

        return new Blob([ia], { type: contentType });
    };

    const convertImage = () => {
        if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgReference.current
        ) {
            const canvas = document.createElement("canvas");
            canvas.width = 4096;
            canvas.height = 4096;

            const context = canvas.getContext("2d");
            const image = imgReference.current;
            const TO_RADIANS = Math.PI / 180;

            context?.fillRect(0, 0, 4000, 4000);

            if (!context) {
                throw new Error("No 2d context");
            }
            const scaleX = image.naturalWidth / image!.width;
            const scaleY = image.naturalHeight / image!.height;

            const pixelRatio = window.devicePixelRatio;

            canvas.width = Math.floor(
                completedCrop.width * scaleX * pixelRatio,
            );

            canvas.height = Math.floor(
                completedCrop.height * scaleY * pixelRatio,
            );

            context.scale(pixelRatio, pixelRatio);
            context.imageSmoothingQuality = "high";

            const cropX = completedCrop.x * scaleX;
            const cropY = completedCrop.y * scaleY;

            const rotateRads = rotate * TO_RADIANS;
            const centerX = image.naturalWidth / 2;
            const centerY = image.naturalHeight / 2;

            context.save();

            context.translate(-cropX, -cropY);
            context.translate(centerX, centerY);
            context.rotate(rotateRads);
            context.scale(scale, scale);
            context.translate(-centerX, -centerY);
            context.drawImage(
                image,
                0,
                0,
                image.naturalWidth,
                image.naturalHeight,
                0,
                0,
                image.naturalWidth,
                image.naturalHeight,
            );

            context.restore();

            const base64Image = canvas.toDataURL("image/jpeg");

            return b64toBlob(base64Image);
        }
    };

    const submitUploadPhoto = async () => {
        if (imagesPopupType === "editMedia") {
            const currentRatio = aspectRatio.find(
                (item) => item.ratio === aspect,
            );

            const fileBlob = convertImage();

            if (!fileBlob) return;

            setUploadPhoto({
                ...uploadPhoto,
                currentRatio: currentRatio ?? null,
                file: fileBlob!,
            });

            if (!uploadPhoto.currentRatio) {
                return;
            }

            const createdImage = await imageService.upload(
                ImageTargetEnum.Artwork,
                fileBlob!,
                {
                    artworkId: artwork ? artwork.id : -1,
                    ratio: uploadPhoto.currentRatio?.field!,
                },
            );
            const ratioMapping: Record<ImageRatioEnum, ArtWorkImageRatio> = {
                [ImageRatioEnum.RATIO_1_1]: ArtWorkImageRatio.RATIO_1_1,
                [ImageRatioEnum.RATIO_3_4]: ArtWorkImageRatio.RATIO_3_4,
                [ImageRatioEnum.RATIO_9_16]: ArtWorkImageRatio.RATIO_9_16,
                [ImageRatioEnum.RATIO_4_3]: ArtWorkImageRatio.RATIO_4_3,
                [ImageRatioEnum.RATIO_16_9]: ArtWorkImageRatio.RATIO_16_9,
                [ImageRatioEnum.RATIO_2_3]: ArtWorkImageRatio.RATIO_2_3,
                [ImageRatioEnum.RATIO_3_2]: ArtWorkImageRatio.RATIO_3_2,
            };

            const convertedRatio =
                ratioMapping[uploadPhoto.currentRatio!.field];

            if (uploadPhoto.side === "alternative") {
                setAlternativeImages([
                    ...alternativeImages,
                    {
                        id: Date.now(),
                        image_id: createdImage,
                        artwork_id: artwork ? artwork.id || -1 : -1,
                        side: uploadPhoto.side as ArtWorkImageSide,
                        ratio: convertedRatio,
                        format: uploadPhoto.format,
                        blob: fileBlob,
                    },
                ]);
            } else {
                const findedImageWithSide = images.find(
                    (img) => img.side === uploadPhoto.side,
                );

                if (findedImageWithSide) {
                    findedImageWithSide.id = Date.now();
                    findedImageWithSide.image_id = createdImage;
                    findedImageWithSide.artwork_id = artwork!.id;
                    findedImageWithSide.side =
                        uploadPhoto.side as ArtWorkImageSide;
                    findedImageWithSide.ratio = convertedRatio;
                    findedImageWithSide.format = uploadPhoto.format;
                    findedImageWithSide.blob = fileBlob;

                    setImages([...images]);
                } else {
                    const newImage = {
                        id: Date.now(),
                        image_id: createdImage,
                        artwork_id: artwork ? artwork.id || -1 : -1,
                        side: uploadPhoto.side as ArtWorkImageSide,
                        ratio: convertedRatio,
                        format: uploadPhoto.format,
                        blob: fileBlob,
                    };

                    setImages([...images, newImage]);
                }
            }
        } else if (imagesPopupType === "newArtwork") {
            const currentRatio = aspectRatio.find(
                (item) => item.ratio === aspect,
            );

            const fileBlob = convertImage();

            console.log(fileBlob);

            if (!fileBlob) return;

            setUploadPhoto({
                ...uploadPhoto,
                currentRatio: currentRatio ?? null,
                file: fileBlob!,
            });

            if (!uploadPhoto.currentRatio) {
                return;
            }

            const ratioMapping: Record<ImageRatioEnum, ArtWorkImageRatio> = {
                [ImageRatioEnum.RATIO_1_1]: ArtWorkImageRatio.RATIO_1_1,
                [ImageRatioEnum.RATIO_3_4]: ArtWorkImageRatio.RATIO_3_4,
                [ImageRatioEnum.RATIO_9_16]: ArtWorkImageRatio.RATIO_9_16,
                [ImageRatioEnum.RATIO_4_3]: ArtWorkImageRatio.RATIO_4_3,
                [ImageRatioEnum.RATIO_16_9]: ArtWorkImageRatio.RATIO_16_9,
                [ImageRatioEnum.RATIO_2_3]: ArtWorkImageRatio.RATIO_2_3,
                [ImageRatioEnum.RATIO_3_2]: ArtWorkImageRatio.RATIO_3_2,
            };

            const convertedRatio =
                ratioMapping[uploadPhoto.currentRatio!.field];

            if (uploadPhoto.side === "alternative") {
                setAlternativeImages([
                    ...alternativeImages,
                    {
                        id: Date.now(),
                        image_id: URL.createObjectURL(fileBlob),
                        artwork_id: artwork ? artwork.id || -1 : -1,
                        side: uploadPhoto.side as ArtWorkImageSide,
                        ratio: convertedRatio,
                        format: uploadPhoto.format,
                        blob: fileBlob,
                    },
                ]);
            } else {
                const findedImageWithSide = images.find(
                    (img) => img.side === uploadPhoto.side,
                );

                if (findedImageWithSide) {
                    findedImageWithSide.id = Date.now();
                    findedImageWithSide.image_id =
                        URL.createObjectURL(fileBlob);
                    findedImageWithSide.artwork_id = artwork ? artwork.id : -1;
                    findedImageWithSide.side =
                        uploadPhoto.side as ArtWorkImageSide;
                    findedImageWithSide.ratio = convertedRatio;
                    findedImageWithSide.format = uploadPhoto.format;
                    findedImageWithSide.blob = fileBlob;

                    setImages([...images]);
                } else {
                    const newImage = {
                        id: Date.now(),
                        image_id: URL.createObjectURL(fileBlob),
                        artwork_id: artwork ? artwork.id || -1 : -1,
                        side: uploadPhoto.side as ArtWorkImageSide,
                        ratio: convertedRatio,
                        format: uploadPhoto.format,
                        blob: fileBlob,
                    };

                    setImages([...images, newImage]);
                }
            }
        }

        setOpenPopup(imagesPopupType);
    };

    const onImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
        if (uploadPhoto.urlPhoto) {
            const img = new Image();
            img.src = uploadPhoto.urlPhoto;
            let aspectRatio = 0;
            img.addEventListener("load", () => {
                aspectRatio = img.width / img.height;
                if (aspectRatio >= 1) {
                    setIsPictureWide(true);
                } else {
                    setIsPictureWide(false);
                }
            });
            if (aspect) {
                const { width, height } = event.currentTarget;

                const resultHeight =
                    img.width / img.height >= 1
                        ? (img.height / img.width) * width
                        : height;
                const resultWidth =
                    img.width / img.height <= 1
                        ? (img.width / img.height) * height
                        : width;
                setCrop(centerAspectCrop(resultWidth, resultHeight, aspect));

                setDimensions({ width: resultWidth, height: resultHeight });
            }
        }
    };

    const onClickRatio = (aspectRatio: number) => {
        if (completedCrop && crop) {
            setAspect(aspectRatio);
            if (imgReference.current) {
                const { width, height } = imgReference.current;
                const newCrop = centerAspectCrop(width, height, aspectRatio);
                setCrop(newCrop);
                setCompletedCrop(convertToPixelCrop(newCrop, width, height));
            }
        }
    };

    const cropperWidth = dimensions?.width ? dimensions?.width : crop?.width;
    const cropperHeight = dimensions?.height
        ? dimensions?.height
        : crop?.height;
    /* useEffect(() => {
        apiClient.main.adminArtwork
            .adminArtworkControllerGetArtwork({ id: Number(params.id) })
            .then((response) => {
                setArtwork(response);
            });
    }, []); */
    return (
        <>
            {openPopup === "adjustImage" && (
                <>
                    <div
                        className={styles.popupBg}
                        onClick={closePopupHandler}
                    ></div>
                    <div className={styles.popup}>
                        <div className={styles.header}>
                            <div className={styles.title}>
                                <img
                                    src="/media/back.svg"
                                    alt="go back"
                                    onClick={goBack}
                                />
                                Adjust image
                            </div>
                            <button
                                className={styles.buttonClose}
                                onClick={closePopupHandler}
                            >
                                <img
                                    src="/media/close.svg"
                                    alt="close"
                                    width="10"
                                    height="10"
                                />
                            </button>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.mainContent}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <div
                                        className={`${
                                            styles.cropImageContent
                                        } ${
                                            isPictureWide ? "picture-wide" : ""
                                        }`}
                                        style={{
                                            width: cropperWidth + "px",
                                            height: cropperHeight + "px",
                                        }}
                                    >
                                        <ReactCrop
                                            crop={crop}
                                            onChange={(_, percentCrop) =>
                                                setCrop(percentCrop)
                                            }
                                            onComplete={(c) =>
                                                setCompletedCrop(c)
                                            }
                                            aspect={aspect}
                                            minHeight={100}
                                        >
                                            <picture>
                                                <img
                                                    ref={imgReference}
                                                    alt="Crop me"
                                                    src={uploadPhoto.urlPhoto}
                                                    style={{
                                                        transform: `scale(${scale}) rotate(${rotate}deg)`,
                                                    }}
                                                    onLoad={onImageLoad}
                                                />
                                            </picture>
                                        </ReactCrop>
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.ratios}>
                                        {aspectRatio.map((item) => (
                                            <button
                                                key={item.title}
                                                className={`${styles.ratio} ${
                                                    aspect == item.ratio
                                                        ? styles.selected
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    onClickRatio(item.ratio)
                                                }
                                            >
                                                <>{item.icon}</>
                                                <div>{item.title}</div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className={styles.range}>
                                        <img
                                            src="/media/zoom-minus.svg"
                                            alt="zoom minus icon"
                                            width={24}
                                            height={24}
                                        />
                                        <input
                                            type="range"
                                            step="any"
                                            min={1}
                                            max={10}
                                            value={scale}
                                            onChange={(event) =>
                                                setScale(
                                                    Number(event.target.value),
                                                )
                                            }
                                        />
                                        <img
                                            src="/media/zoom-plus.svg"
                                            alt="zoom plus icon"
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.buttons}>
                                <Button
                                    appearance="blue"
                                    onClick={submitUploadPhoto}
                                >
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

const mapState = (state: {
    openPopup: IPopupStore;
    uploadPhoto: IUploadProps;
    artwork: IArtworkStore;
    editMedia: IEditMediaStore;
}) => {
    return {
        openPopup: state.openPopup.openPopup,
        uploadPhoto: state.uploadPhoto.uploadPhoto,
        artwork: state.artwork.artwork,
        alternativeImages: state.editMedia.alternativeImages,
        images: state.editMedia.images,
        imagesPopupType: state.editMedia.imagesPopupType,
    };
};
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
    setUploadPhoto: (uploadPhoto: IPhoto) => ({
        type: "UPLOAD_PHOTO",
        uploadPhoto,
    }),
    setAlternativeImages: (alternativeImages: IEditMediaStore["images"]) => ({
        type: "SET_ALTERNATIVE_IMAGES",
        alternativeImages,
    }),
    setImages: (images: IEditMediaStore["images"]) => ({
        type: "SET_IMAGES",
        images,
    }),
};
const connector = connect(mapState, mapDispatch);

export const AdjustImagePopup = connector(AdjustImageComponentPopup);
