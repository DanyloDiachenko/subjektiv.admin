"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { EditUserPopupProps } from "./popup.props";
import useClickOutside from "@/helpers/useClickOutside";
import apiClient from "@/api/apiClient";
import { IRootState } from "@/store";
import { MainSubjectPostRequestDto } from "@/submodules/common-dto/api-client/main/models/MainSubjectPostRequestDto";
import { MainStylePostRequestDto } from "@/submodules/common-dto/api-client/main/models/MainStylePostRequestDto";
import { MainMaterialPostRequestDto } from "@/submodules/common-dto/api-client/main/models/MainMaterialPostRequestDto";
import { MainKeywordsPostRequestDto } from "@/submodules/common-dto/api-client/main/models/MainKeywordsPostRequestDto";
import { MainCategoriesPostRequestDto } from "@/submodules/common-dto/api-client/main/models/MainCategoriesPostRequestDto";
import SingleImage from "@/components/SingleImage";
import { ImageKindEnum } from "@/submodules/common-dto/api-client/storage/models/ImageKindEnum";
import { storage } from "@/helpers/storage";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { MainDataIdResponse } from "@/components/GeneralDetails/general.props";

export const AddGeneralPopupComponent = ({
    openPopup,
    closePopup,
    setAddNewGeneral,
}: EditUserPopupProps): JSX.Element => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    const place = storage.getItem("page");

    const [changedFields, setChangedFields] = useState<{
        [key: string]: string | null;
    }>({});

    useClickOutside(popupRef, () => {
        closePopup();
    });

    const onChangeValue = (field: string, value: string) => {
        const currentChangedFields = {
            ...changedFields,
            [field]: value,
        };
        setChangedFields(currentChangedFields);
    };

    const addData = async () => {
        try {
            if (place === ImageTargetEnum.Subject) {
                await apiClient.main.subjects
                    .subjectControllerCreateSubject({
                        requestBody: changedFields as MainSubjectPostRequestDto,
                    })
                    .then((response) => {
                        setAddNewGeneral({
                            data: response.data,
                            place: ImageTargetEnum.Subject,
                        });
                        closePopup();
                    });
            } else if (place === ImageTargetEnum.Style) {
                await apiClient.main.styles
                    .styleControllerCreateStyle({
                        requestBody: changedFields as MainStylePostRequestDto,
                    })
                    .then((response) => {
                        setAddNewGeneral({
                            data: response.data,
                            place: ImageTargetEnum.Style,
                        });
                        closePopup();
                    });
            } else if (place === ImageTargetEnum.Material) {
                await apiClient.main.materials
                    .materialControllerCreateMaterial({
                        requestBody:
                            changedFields as MainMaterialPostRequestDto,
                    })
                    .then((response) => {
                        setAddNewGeneral({
                            data: response.data,
                            place: ImageTargetEnum.Material,
                        });
                        closePopup();
                    });
            } else if (place === ImageTargetEnum.Keyword) {
                await apiClient.main.keywords
                    .keywordControllerCreateKeyword({
                        requestBody:
                            changedFields as unknown as MainKeywordsPostRequestDto,
                    })
                    .then((response) => {
                        setAddNewGeneral({
                            data: response.data,
                            place: ImageTargetEnum.Keyword,
                        });
                        closePopup();
                    });
            } else if (place === ImageTargetEnum.Category) {
                await apiClient.main.categories
                    .categoryControllerCreateCategory({
                        requestBody:
                            changedFields as unknown as MainCategoriesPostRequestDto,
                    })
                    .then((response) => {
                        setAddNewGeneral({
                            data: response.data,
                            place: ImageTargetEnum.Category,
                        });
                        closePopup();
                    });
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    console.log(changedFields);

    return (
        <>
            {openPopup === "addGeneral" && (
                <>
                    <div className={styles.popupBg}></div>
                    <div className={styles.popup} ref={popupRef}>
                        <div className={styles.header}>
                            <div className={styles.title}>Create</div>
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
                            <SingleImage
                                kind={ImageKindEnum.GENERAL}
                                place={place}
                                setChangedFields={setChangedFields}
                                changedFields={changedFields}
                            />
                            <label htmlFor="title" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Title (English)
                                </div>
                                <Input
                                    className={`${styles.input}
                                     ${
                                         changedFields.title?.length === 0
                                             ? styles.empty
                                             : ""
                                     }
                                    `}
                                    defaultValue={changedFields.title || ""}
                                    placeholder={`Type the ${place}'s name`}
                                    onChange={(e) =>
                                        onChangeValue("title", e.target.value)
                                    }
                                />
                            </label>
                            {place !== ImageTargetEnum.Keyword && (
                                <label htmlFor="slug" className={styles.label}>
                                    <div className={styles.inputTitle}>
                                        Slug
                                    </div>
                                    <Input
                                        className={`${styles.input}
                                    ${
                                        changedFields.slug?.length === 0
                                            ? styles.empty
                                            : ""
                                    }
                                    `}
                                        defaultValue={changedFields.slug || ""}
                                        onChange={(e) =>
                                            onChangeValue(
                                                "slug",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Type slug"
                                    />
                                </label>
                            )}
                            {place === ImageTargetEnum.Category && (
                                <label
                                    htmlFor="image_id"
                                    className={styles.label}
                                >
                                    <div className={styles.inputTitle}>
                                        Description
                                    </div>
                                    <Input
                                        className={`${styles.input}
                                    ${
                                        changedFields.image_id?.length === 0
                                            ? styles.empty
                                            : ""
                                    }
                                    `}
                                        defaultValue={
                                            changedFields.description ?? ""
                                        }
                                        onChange={(e) =>
                                            onChangeValue(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </label>
                            )}
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.error}>{}</div>
                            <div className={styles.buttons}>
                                <Button appearance="grey" onClick={closePopup}>
                                    Discard
                                </Button>
                                <Button appearance="blue" onClick={addData}>
                                    Create
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
    generalData: state.general.generalData,
    addNewGeneral: state.general.addNewGeneral,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
    setAddNewGeneral: (addNewGeneral: {
        data: MainDataIdResponse | null;
        place: string | null;
    }) => ({
        type: "SET_ADD_NEW_GENERAL",
        addNewGeneral,
    }),
};

const connector = connect(mapState, mapDispatch);

export const AddGeneralPopup = connector(AddGeneralPopupComponent);
