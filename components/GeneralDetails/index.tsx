"use client";

import Image from "next/image";
import { connect } from "react-redux";
import { FormEvent, useEffect, useRef, useState } from "react";

import { Button } from "../UI/Button";
import styles from "./styles.module.scss";
import { storage } from "@/helpers/storage";
import { MainDataIdResponse } from "./general.props";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import apiClient from "@/api/apiClient";
import { useParams, useRouter } from "next/navigation";
import { Input } from "../UI/Input";
import { IRootState } from "@/store";
import { Tooltip } from "../UI/Tootip";
import { ImageKindEnum } from "@/submodules/common-dto/api-client/storage";

interface GeneralDetailsProps {
    data: MainDataIdResponse;
    setOpenPopup: (popupToOpen: string) => void;
    setGeneralData: (generalData: MainDataIdResponse) => void;
}

const languages = [
    {
        title: "English",
        key: "en",
    },
    {
        title: "German",
        key: "de",
    },
    {
        title: "Spanish",
        key: "es",
    },
    {
        title: "Ukrainian",
        key: "uk",
    },
    {
        title: "French",
        key: "fr",
    },
    {
        title: "Italian",
        key: "it",
    },
];

const GeneralDetailsComponent = ({
    data,
    setOpenPopup,
    setGeneralData,
}: GeneralDetailsProps) => {
    const id = Number(useParams().id);
    const router = useRouter();
    const page = storage.getItem("page");
    const avatarInputRef = useRef<HTMLInputElement | null>(null);

    const transformFieldsToPatch = (fields: MainDataIdResponse) => {
        console.log(fields);

        const patch: any = {
            title: fields.title,
            image_id: fields.image_id,
        };

        if ("description" in fields) {
            patch.description = fields.description;
        }
        if ("order_number" in fields) {
            patch.order_number = fields.order_number;
        }
        if ("slug" in fields) {
            patch.slug = fields.slug;
        }

        return patch;
    };

    const [changedFields, setChangedFields] = useState<MainDataIdResponse>(
        transformFieldsToPatch(data),
    );
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [activeLanguage, _] = useState<string>("en");

    const onChangeValue = (field: string, value: string) => {
        const currentChangedFields = {
            ...changedFields,
            [field]: value,
        };
        setChangedFields(currentChangedFields);
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (page === ImageTargetEnum.Subject) {
            apiClient.main.subjects
                .subjectControllerUpdateSubject({
                    id: id,
                    requestBody: changedFields,
                    contentLanguage: activeLanguage,
                })
                .then((response) => {
                    setChangedFields(transformFieldsToPatch(response.data));
                    router.push("/app-settings/artwork");
                });
        } else if (page === ImageTargetEnum.Style) {
            apiClient.main.styles
                .styleControllerUpdateStyle({
                    id: id,
                    requestBody: changedFields,
                    contentLanguage: activeLanguage,
                })
                .then((response) => {
                    setChangedFields(transformFieldsToPatch(response.data));
                    router.push("/app-settings/artwork");
                });
        } else if (page === ImageTargetEnum.Material) {
            apiClient.main.materials
                .materialControllerUpdateMaterial({
                    id: id,
                    requestBody: changedFields,
                    contentLanguage: activeLanguage,
                })
                .then((response) => {
                    setChangedFields(transformFieldsToPatch(response.data));
                    router.push("/app-settings/artwork");
                });
        } else if (page === ImageTargetEnum.Keyword) {
            apiClient.main.keywords
                .keywordControllerUpdateKeyword({
                    id: id,
                    requestBody: changedFields,
                    contentLanguage: activeLanguage,
                })
                .then((response) => {
                    setChangedFields(transformFieldsToPatch(response.data));
                    router.push("/app-settings/artwork");
                });
        } else if (page === ImageTargetEnum.Category) {
            if (!("order_number" in changedFields)) {
                return;
            }

            apiClient.main.categories
                .categoryControllerUpdateCategory({
                    id: id,
                    requestBody: {
                        ...changedFields,
                        order_number: changedFields.order_number || undefined,
                    },
                    contentLanguage: activeLanguage,
                })
                .then((response) => {
                    setChangedFields(transformFieldsToPatch(response.data));
                    router.push("/app-settings/artwork");
                });
        }
    };

    const deleteData = () => {
        setGeneralData(data!);
        setOpenPopup("confirm-general-delete");
    };

    const returnEnumValue = () => {
        switch (page) {
            case "category": {
                return ImageTargetEnum.Category;
            }
            case "categories": {
                return ImageTargetEnum.Category;
            }
            case "style": {
                return ImageTargetEnum.Style;
            }
            case "styles": {
                return ImageTargetEnum.Style;
            }
            case "material": {
                return ImageTargetEnum.Material;
            }
            case "materials": {
                return ImageTargetEnum.Material;
            }
            case "subject": {
                return ImageTargetEnum.Subject;
            }
            case "subjects": {
                return ImageTargetEnum.Subject;
            }
            case "keyword": {
                return ImageTargetEnum.Subject;
            }
            case "keywords": {
                return ImageTargetEnum.Subject;
            }
        }
    };

    const getImageSrc = () => {
        if (avatarFile) {
            return URL.createObjectURL(avatarFile);
        }
        if (changedFields.image_id) {
            return imageService.getUrl(
                // @ts-expect-error ___
                returnEnumValue(),
                null,
                changedFields.image_id,
                "small",
            );
        }

        return "/media/no-avatar.png";
    };

    const handleAvatarChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            setAvatarFile(file);

            const imageId =
                await apiClient.storage.storage.storageControllerUpload({
                    place: returnEnumValue() as string,
                    kind: ImageKindEnum.GENERAL,
                    formData: {
                        file: file,
                    },
                });

            setChangedFields({
                ...changedFields,
                image_id: imageId.data.image_id,
            });
        }

        e.target.value = "";
    };

    const handleEditAvatarClick = () => {
        if (avatarInputRef.current) {
            avatarInputRef.current.click();
        }
    };

    useEffect(() => {
        if (!data) {
            return;
        }
    }, []);

    if (!changedFields) {
        return <></>;
    }

    /*  const onLanguageClick = async (languageKey: string) => {
        setAcitveLanguage(languageKey);

        try {
            if (page === ImageTargetEnum.Subject) {
                apiClient.main.subjects
                    .subjectControllerGetSubject({
                        idOrSlug: id,
                        contentLanguage: languageKey,
                    })
                    .then((response) => {
                        setChangedFields(transformFieldsToPatch(response));
                        router.refresh();
                    });
            } else if (page === ImageTargetEnum.Style) {
                apiClient.main.styles
                    .styleControllerGetStyle({
                        idOrSlug: id,
                        contentLanguage: languageKey,
                    })
                    .then((response) => {
                        setChangedFields(transformFieldsToPatch(response));
                        router.refresh();
                    });
            } else if (page === ImageTargetEnum.Material) {
                apiClient.main.materials
                    .materialControllerGetMaterial({
                        idOrSlug: id,
                        contentLanguage: languageKey,
                    })
                    .then((response) => {
                        setChangedFields(transformFieldsToPatch(response));
                        router.refresh();
                    });
            } else if (page === ImageTargetEnum.Keyword) {
                apiClient.main.keywords
                    .keywordControllerGetKeyword({
                        id: id,
                        contentLanguage: languageKey,
                    })
                    .then((response) => {
                        setChangedFields(transformFieldsToPatch(response));
                        router.refresh();
                    });
            } else if (page === ImageTargetEnum.Category) {
                apiClient.main.categories
                    .categoryControllerGetCategory({
                        idOrSlug: id,
                        contentLanguage: languageKey,
                    })
                    .then((response) => {
                        setChangedFields(transformFieldsToPatch(response));
                        router.refresh();
                    });
            }
        } catch (error) {
            console.log(error);
        }
    }; */

    return (
        <div className={`card card-flush mb-6 mb-xl-9 ${styles.card}`}>
            <div className={`card-header ${styles.cardHeader}`}>
                <div className="card-title flex-column">
                    <h2>
                        {data &&
                            "slug" in data &&
                            data.slug[0].toLocaleUpperCase() +
                                data.slug.slice(1, data.slug.length)}
                    </h2>
                </div>
                <div className="card-toolbar">
                    <Button
                        className={styles.delete}
                        appearance="red"
                        onClick={deleteData}
                    >
                        Delete
                    </Button>
                </div>
            </div>
            <div className={`card-body ${styles.cardBody}`}>
                <div className={styles.avatar}>
                    <div className={styles.inputTitle}>Avatar</div>
                    <div className={styles.image}>
                        {avatarFile ? (
                            <Image
                                src={getImageSrc()}
                                alt="avatar"
                                width="90"
                                height="90"
                                className={styles.userImage}
                                id="avatar"
                            />
                        ) : changedFields.image_id ? (
                            <Image
                                src={getImageSrc()}
                                alt="avatar"
                                width="90"
                                height="90"
                                className={styles.userImage}
                                id="avatar"
                            />
                        ) : (
                            <div
                                className={styles.plus}
                                onClick={handleEditAvatarClick}
                            >
                                +
                            </div>
                        )}
                        <label htmlFor="avatar">
                            <input
                                type="file"
                                id="avatar"
                                ref={avatarInputRef}
                                className={styles.inputFile}
                                style={{ display: "none" }}
                                onChange={handleAvatarChange}
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
                                setAvatarFile(null);
                                onChangeValue("image_id", "");
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
                <ul className={styles.languages}>
                    {languages.map((lang, index) => (
                        <li
                            key={index}
                            className={
                                lang.key === activeLanguage ? styles.active : ""
                            }
                            /*  onClick={() => onLanguageClick(lang.key)} */
                            data-tooltip-content="Currently doesn`t work"
                            data-tooltip-id={`language-${index}`}
                        >
                            <Tooltip id={`language-${index}`} />
                            {lang.title}
                        </li>
                    ))}
                </ul>
                <form onSubmit={submit}>
                    <label className={styles.item}>
                        <div className={styles.label}>Title</div>
                        <Input
                            placeholder="Title..."
                            defaultValue={changedFields.title || ""}
                            onChange={(e) =>
                                onChangeValue("title", e.target.value)
                            }
                            className={styles.input}
                        />
                    </label>
                    {"slug" in changedFields && (
                        <label className={styles.item}>
                            <div className={styles.label}>Slug</div>
                            <Input
                                placeholder="Slug..."
                                defaultValue={changedFields.slug || ""}
                                onChange={(e) =>
                                    onChangeValue("slug", e.target.value)
                                }
                                className={styles.input}
                            />
                        </label>
                    )}
                    {"description" in changedFields && (
                        <label className={styles.item}>
                            <div className={styles.label}>Description</div>
                            <textarea
                                placeholder="Description..."
                                defaultValue={changedFields.description || ""}
                                onChange={(e) =>
                                    onChangeValue("description", e.target.value)
                                }
                                className={styles.input}
                            ></textarea>
                        </label>
                    )}
                    {"order_number" in changedFields && (
                        <label className={styles.item}>
                            <div className={styles.label}>Order Number</div>
                            <Input
                                placeholder="Order Number"
                                defaultValue={changedFields.order_number || 0}
                                type="number"
                                onChange={(e) => {
                                    setChangedFields({
                                        ...changedFields,
                                        order_number: Number(e.target.value),
                                    });
                                }}
                                className={styles.input}
                            />
                        </label>
                    )}
                    <Button appearance="blue" className={styles.submit}>
                        Save changes
                    </Button>
                </form>
            </div>
        </div>
    );
};

const mapState = (state: IRootState) => ({
    generalData: state.general.generalData,
});
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
    setGeneralData: (generalData: MainDataIdResponse) => ({
        type: "SET_GENERAL_DATA",
        generalData,
    }),
};

const connector = connect(mapState, mapDispatch);

export const GeneralDetails = connector(GeneralDetailsComponent);
