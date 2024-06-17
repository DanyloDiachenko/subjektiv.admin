"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { EditUserPopupProps } from "./popup.props";
import useClickOutside from "@/helpers/useClickOutside";
import {
    MainCategoriesGetIdResponseDto,
    MainKeywordsMainKeywordsGetIdResponseDto,
    MainMaterialGetIdResponseDto,
    MainStyleGetIdResponseDto,
    MainSubjectGetIdResponseDto,
} from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import { IRootState } from "@/store";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { ImageKindEnum } from "@/submodules/common-dto/api-client/storage/models/ImageKindEnum";
import { storage } from "@/helpers/storage";
import SingleImage from "@/components/SingleImage";

export const EditGeneralPopupComponent = ({
    openPopup,
    closePopup,
    generalData,
    setGeneralData,
}: EditUserPopupProps): JSX.Element => {
    const router = useRouter();

    const popupRef = useRef<HTMLDivElement | null>(null);

    const page = storage.getItem("page");

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

    const editData = () => {
        if (page === ImageTargetEnum.Subject) {
            apiClient.main.subjects
                .subjectControllerUpdateSubject({
                    id: generalData.id,
                    requestBody: changedFields,
                })
                .then((response) => {
                    setGeneralData(response.data);
                    closePopup();
                    router.refresh();
                });
        } else if (page === ImageTargetEnum.Style) {
            apiClient.main.styles
                .styleControllerUpdateStyle({
                    id: generalData.id,
                    requestBody: changedFields,
                })
                .then((response) => {
                    setGeneralData(response.data);
                    closePopup();
                    router.refresh();
                });
        } else if (page === ImageTargetEnum.Material) {
            apiClient.main.materials
                .materialControllerUpdateMaterial({
                    id: generalData.id,
                    requestBody: changedFields,
                })
                .then((response) => {
                    setGeneralData(response.data);
                    closePopup();
                    router.refresh();
                });
        } else if (page === ImageTargetEnum.Keyword) {
            apiClient.main.keywords
                .keywordControllerUpdateKeyword({
                    id: generalData.id,
                    requestBody: changedFields,
                })
                .then((response) => {
                    setGeneralData(response.data);
                    closePopup();
                    router.refresh();
                });
        } else if (page === ImageTargetEnum.Category) {
            apiClient.main.categories
                .categoryControllerUpdateCategory({
                    id: generalData.id,
                    requestBody: changedFields,
                })
                .then((response) => {
                    setGeneralData(response.data);
                    closePopup();
                    router.refresh();
                });
        }
    };

    return (
        <>
            {openPopup === "editGeneral" && (
                <>
                    <div className={styles.popupBg}></div>
                    <div className={styles.popup} ref={popupRef}>
                        <div className={styles.header}>
                            <div className={styles.title}>Edit</div>
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
                                imageId={generalData.image_id}
                                place={page}
                                setChangedFields={setChangedFields}
                                changedFields={changedFields}
                            />
                            <label htmlFor="title" className={styles.label}>
                                <div className={styles.inputTitle}>Title</div>
                                <Input
                                    className={`${styles.input}
                                     ${
                                         changedFields.title?.length === 0
                                             ? styles.empty
                                             : ""
                                     }
                                    `}
                                    defaultValue={generalData.title}
                                    onChange={(e) =>
                                        onChangeValue("title", e.target.value)
                                    }
                                />
                            </label>
                            {"slug" in generalData && (
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
                                        defaultValue={generalData.slug}
                                        onChange={(e) =>
                                            onChangeValue(
                                                "slug",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </label>
                            )}
                            {page === ImageTargetEnum.Category && (
                                <>
                                    {"description" in generalData && (
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
                                        changedFields.description?.length === 0
                                            ? styles.empty
                                            : ""
                                    }
                                    `}
                                                defaultValue={
                                                    generalData.description ??
                                                    ""
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
                                </>
                            )}
                            {/* <label htmlFor="id" className={styles.label}>
                                <div className={styles.inputTitle}>ID</div>
                                <Input
                                    className={`
                                    ${styles.disable}
                                    `}
                                    defaultValue={generalData.id}
                                    disabled
                                />
                            </label> */}
                        </div>
                        <div className={styles.bottom}>
                            {/* <div className={styles.error}>{errorMessage}</div> */}
                            <div className={styles.buttons}>
                                <Button appearance="grey" onClick={closePopup}>
                                    Discard
                                </Button>
                                <Button appearance="blue" onClick={editData}>
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
    generalData: state.general.generalData,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
    setGeneralData: (
        generalData:
            | MainSubjectGetIdResponseDto
            | MainKeywordsMainKeywordsGetIdResponseDto
            | MainStyleGetIdResponseDto
            | MainCategoriesGetIdResponseDto
            | MainMaterialGetIdResponseDto,
    ) => ({
        type: "SET_GENERAL_DATA",
        generalData,
    }),
};

const connector = connect(mapState, mapDispatch);

export const EditGeneralPopup = connector(EditGeneralPopupComponent);
