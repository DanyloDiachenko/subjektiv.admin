"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { EditUserPopupProps } from "./popup.props";
import apiClient from "@/api/apiClient";
import { MainCountriesPostRequestDto } from "@/submodules/common-dto/api-client/main";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";

export const NewCountryPopupComponent = ({
    closePopup,
}: EditUserPopupProps): JSX.Element => {
    const router = useRouter();

    const [changedFields, setChangedFields] =
        useState<MainCountriesPostRequestDto>({
            flag_image_id: undefined,
            title: "",
            short_code: "",
        });
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [source, setSource] = useState<string>("/media/Empty.png");
    const [errorMessage, setErrorMessage] = useState("");

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImageFile(file);

            await imageService
                .upload(ImageTargetEnum.CountryFlag, file, null)
                .then((response) => {
                    setChangedFields({
                        ...changedFields,
                        flag_image_id: response, // response = imageId,
                    });
                    setSource(
                        imageService.getUrl(
                            ImageTargetEnum.CountryFlag,
                            null,
                            response,
                            "small",
                        ),
                    );
                });
        }
    };

    const handleEditImageClick = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    const returnFlagImageSrc = () => {
        if (imageFile) {
            return URL.createObjectURL(imageFile);
        }
        return source;
    };

    const submit = async () => {
        if (!changedFields) {
            return;
        }

        try {
            await apiClient.main.countries.countryControllerCreateCountry({
                requestBody: changedFields,
            });

            router.refresh();
            closePopup();
        } catch (error: any) {
            console.log("Error editing country", error);
            const responseError = error.response;
            console.log(responseError);

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

    console.log(changedFields);

    return (
        <>
            <div className={styles.popupBg} onClick={closePopup}></div>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.title}>Create Country</div>
                    <button className={styles.buttonClose} onClick={closePopup}>
                        <Image
                            src="/media/close.svg"
                            alt="close"
                            width="10"
                            height="10"
                        />
                    </button>
                </div>
                <div className={styles.body}>
                    <div className={styles.avatar}>
                        <div className={styles.inputTitle}>Country Flag</div>
                        <div className={styles.image}>
                            <Image
                                src={returnFlagImageSrc()}
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
                                    onClick={handleEditImageClick}
                                    className={`${styles.imageButton} ${styles.editButton}`}
                                >
                                    <Image
                                        src="/media/edit-profile.svg"
                                        alt="edit flag photo"
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
                                    setChangedFields({
                                        ...changedFields,
                                        flag_image_id: null,
                                    });
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
                    <label htmlFor="title" className={styles.label}>
                        <div className={styles.inputTitle}>Title</div>
                        <Input
                            className={styles.input}
                            defaultValue={changedFields.title}
                            onChange={(e) => {
                                setChangedFields({
                                    ...changedFields,
                                    title: e.target.value,
                                });
                            }}
                        />
                    </label>
                    <label htmlFor="shortCode" className={styles.label}>
                        <div className={styles.inputTitle}>Short Code</div>
                        <Input
                            className={styles.input}
                            defaultValue={changedFields.short_code}
                            onChange={(e) => {
                                setChangedFields({
                                    ...changedFields,
                                    short_code: e.target.value,
                                });
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
    );
};

const mapState = () => ({});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const NewCountryPopup = connector(NewCountryPopupComponent);
