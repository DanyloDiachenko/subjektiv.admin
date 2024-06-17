"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";
import { EditUserPopupProps } from "./popup.props";
import useClickOutside from "@/helpers/useClickOutside";
import { MainSubjectGetIdResponseDto } from "@/submodules/common-dto/api-client/main";
import { IRootState } from "@/store";
import apiClient from "@/api/apiClient";
import { storage } from "@/helpers/storage";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";

export const ConfirmGeneralDeletePopupComponent = ({
    openPopup,
    closePopup,
    generalData,
}: EditUserPopupProps): JSX.Element => {
    const router = useRouter();
    const popupRef = useRef<HTMLDivElement | null>(null);
    const page = storage.getItem("page");

    useClickOutside(popupRef, () => {
        closePopup();
    });

    const confirm = (id: number) => {
        if (page === ImageTargetEnum.Subject) {
            apiClient.main.subjects
                .subjectControllerDeleteSubject({ id })
                .then(() => {
                    router.refresh();
                    router.push("/app-settings/artwork");
                });
        } else if (page === ImageTargetEnum.Style) {
            apiClient.main.styles
                .styleControllerDeleteStyle({ id })
                .then(() => {
                    router.refresh();
                    router.push("/app-settings/artwork");
                });
        } else if (page === ImageTargetEnum.Category) {
            apiClient.main.categories
                .categoryControllerDeleteCategory({ id })
                .then(() => {
                    router.refresh();
                    router.push("/app-settings/artwork");
                });
        } else if (page === ImageTargetEnum.Keyword) {
            apiClient.main.keywords
                .keywordControllerDeleteKeyword({ id })
                .then(() => {
                    router.refresh();
                    router.push("/app-settings/artwork");
                });
        } else if (page === ImageTargetEnum.Material) {
            apiClient.main.materials
                .materialControllerDeleteMaterial({ id })
                .then(() => {
                    router.refresh();
                    router.push("/app-settings/artwork");
                });
        }
        closePopup();
    };

    console.log(generalData);

    return (
        <>
            {openPopup === "confirm-general-delete" && (
                <>
                    <div className={styles.popupBg}></div>
                    <div className={styles.popup} ref={popupRef}>
                        <div className={styles.header}>
                            <div className={styles.title}>
                                Delete {page === "keywords" ? "keyword" : page}
                            </div>
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
                            <Image
                                src="/media/warning.png"
                                alt="warning"
                                width={70}
                                height={71}
                                className={styles.warnImage}
                            />
                            <div className={styles.text}>
                                Are you sure want to delete ”{generalData.title}{" "}
                                {page === "keywords" ? "keyword" : page}?
                            </div>
                        </div>
                        <div className={styles.bottom}>
                            {/* <div className={styles.error}>{errorMessage}</div> */}
                            <div className={styles.buttons}>
                                <Button
                                    appearance="lightBlue"
                                    onClick={() => confirm(generalData.id)}
                                    className={styles.buttonDelete}
                                >
                                    Yes, delete
                                </Button>
                                <Button appearance="grey" onClick={closePopup}>
                                    No, cancel
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
    setGeneralData: (generalData: MainSubjectGetIdResponseDto) => ({
        type: "SET_GENERAL_DATA",
        generalData,
    }),
};

const connector = connect(mapState, mapDispatch);

export const ConfirmGeneralDeletePopup = connector(
    ConfirmGeneralDeletePopupComponent,
);
