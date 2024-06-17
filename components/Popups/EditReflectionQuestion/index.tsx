"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";
import { EditUserPopupProps } from "./popup.props";
import useClickOutside from "@/helpers/useClickOutside";
import apiClient from "@/api/apiClient";
import { IRootState } from "@/store";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/UI/Input";

export const EditReflectionQuestionPopupComponent = ({
    openPopup,
    closePopup,
}: EditUserPopupProps): JSX.Element => {
    const router = useRouter();
    const params = useParams();
    const [changedFields, setChangedFields] = useState<{
        [key: string]: string;
    }>({});
    const [errorMessages, _] = useState<{
        [key: string]: string | null;
    }>({});

    const popupRef = useRef<HTMLDivElement | null>(null);

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

    const editOrder = () => {
        apiClient.main.commentQuestion
            .artworkCommentQuestionControllerUpdateCommentQuestion({
                id: Number(params.id),
                requestBody: { title: changedFields.title },
            })
            .then(() => {
                router.refresh();
                closePopup();
            })
            .catch((/* error: any */) => {
                // const erroMessagesObject = {
                //     packaging_type: transformText(errorMessages.packaging_type),
                //     status: transformText(errorMessages.status),
                // };
                // setErrorMessages(erroMessagesObject);
            });
    };

    useEffect(() => {
        apiClient.main.commentQuestion
            .artworkCommentQuestionControllerGetCommentQuestion({
                id: Number(params.id),
            })
            .then((response) => {
                setChangedFields({ title: response.title });
            });
    }, [openPopup]);

    return (
        <>
            {openPopup === "edit-reflection-question" && (
                <>
                    <div className={styles.popupBg}></div>
                    <div className={styles.popup} ref={popupRef}>
                        <div className={styles.header}>
                            <div className={styles.title}>
                                {`Edit Reflection Question`}
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
                            <label
                                htmlFor="reflection-question"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Reflection Question
                                </div>
                                <Input
                                    className={`${styles.input}`}
                                    placeholder="Type Reflection Question"
                                    value={changedFields.title as string}
                                    disabled={false}
                                    onChange={(e) =>
                                        onChangeValue("title", e.target.value)
                                    }
                                    errorMessage={errorMessages.packaging_type}
                                />
                            </label>
                        </div>
                        <div className={styles.bottom}>
                            {/* <div className={styles.error}>{errorMessage}</div> */}
                            <div className={styles.buttons}>
                                <Button appearance="grey" onClick={closePopup}>
                                    Discard
                                </Button>
                                <Button appearance="blue" onClick={editOrder}>
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
    orderId: state.openPopup.orderId,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const EditReflectionQuestionPopup = connector(
    EditReflectionQuestionPopupComponent,
);
