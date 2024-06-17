"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { EditUserPopupProps } from "./popup.props";
import apiClient from "@/api/apiClient";
import { MainArtworkCommentQuestionPostRequestDto } from "@/submodules/common-dto/api-client/main/models/MainArtworkCommentQuestionPostRequestDto";

export const NewReflectionQuestionPopupComponent = ({
    closePopup,
}: EditUserPopupProps): JSX.Element => {
    const router = useRouter();

    const [changedFields, setChangedFields] =
        useState<MainArtworkCommentQuestionPostRequestDto>({
            title: "",
        });

    const submit = async () => {
        if (!changedFields) {
            return;
        }

        try {
            await apiClient.main.commentQuestion.artworkCommentQuestionControllerCreateCommentQuestion(
                {
                    requestBody: changedFields,
                },
            );

            router.refresh();
            closePopup();
        } catch (error) {
            console.log(error);
        }
    };

    const discard = () => {
        closePopup();
    };

    return (
        <>
            <div className={styles.popupBg} onClick={closePopup}></div>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.title}>Create question</div>
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
                </div>
                <div className={styles.bottom}>
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

export const NewReflectionQuestionPopup = connector(
    NewReflectionQuestionPopupComponent,
);
