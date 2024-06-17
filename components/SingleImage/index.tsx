"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { ImageKindEnum } from "@/submodules/common-dto/api-client/storage/models/ImageKindEnum";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";

interface ISingleImage {
    place: PlaceType;
    imageId?: string | null;
    setChangedFields: (fields: { [key: string]: string | null }) => void;
    changedFields?: { [key: string]: string | null };
    kind: ImageKindEnum;
}

type PlaceType = "category" | "style" | "material" | "subject";

const returnEnumValue = (place: PlaceType) => {
    switch (place) {
        case "category": {
            return ImageTargetEnum.Category;
        }
        case "style": {
            return ImageTargetEnum.Style;
        }
        case "material": {
            return ImageTargetEnum.Material;
        }
        case "subject": {
            return ImageTargetEnum.Subject;
        }
    }
};

const SingleImage = ({
    place,
    imageId,
    setChangedFields,
    changedFields,
}: ISingleImage) => {
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [source, setSource] = useState<string>(
        imageId
            ? imageService.getUrl(
                  returnEnumValue(place),
                  null,
                  imageId,
                  "small",
              )
            : "/media/Empty.png",
    );

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImageFile(file);

            await imageService
                .upload(returnEnumValue(place), file, null)
                .then((response) => {
                    setChangedFields({
                        ...changedFields,
                        image_id: response, // response = imageId,
                    });
                    setSource(
                        imageService.getUrl(
                            returnEnumValue(place),
                            null,
                            response,
                            "small",
                        ),
                    );
                });
        }
    };

    const handleEditAvatarClick = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    const getUserImageSrc = () => {
        if (imageFile) {
            return URL.createObjectURL(imageFile);
        }
        return source;
    };

    console.log(source);

    return (
        <div className={styles.avatar}>
            <div className={styles.inputTitle}>Image ID</div>
            <div className={styles.image}>
                <Image
                    src={getUserImageSrc()}
                    alt=""
                    width={90}
                    height={90}
                    onError={() => setSource("/media/Empty.png")}
                    className={styles.userImage}
                    id="image"
                />
                <label htmlFor="image">
                    <input
                        type="file"
                        id="avatar"
                        ref={imageInputRef}
                        className={styles.inputFile}
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    <button
                        onClick={handleEditAvatarClick}
                        className={`${styles.imageButton} ${styles.editButton}`}
                    >
                        <Image
                            src="/media/edit-profile.svg"
                            alt="edit user photo"
                            width="16"
                            height="16"
                        />
                    </button>
                </label>
                <button
                    className={`${styles.imageButton} ${styles.clearButton}`}
                    onClick={() => {
                        setImageFile(null);
                        setSource("");
                        setChangedFields({ ...changedFields, image_id: null });
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
            <p className={styles.imageParagraph}>
                Allowed file types: png, jpg, jpeg.
            </p>
        </div>
    );
};

export default SingleImage;
