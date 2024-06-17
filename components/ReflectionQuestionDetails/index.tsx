"use client";

import { connect } from "react-redux";

import { Button } from "../UI/Button";
import styles from "./styles.module.scss";
import apiClient from "@/api/apiClient";
import { useRouter } from "next/navigation";

import { ReflectionQuestionDetailsProps } from "./module.props";

const ReflectionQuestionDetailsComponent = ({
    reflectionQuestion,
    setOpenPopup,
}: ReflectionQuestionDetailsProps) => {
    const router = useRouter();

    const deleteReflectionQuestion = () => {
        try {
            apiClient.main.commentQuestion.artworkCommentQuestionControllerDeleteCommentQuestion(
                {
                    id: reflectionQuestion.id,
                },
            );

            router.push("/reflection-questions");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`card card-flush mb-6 mb-xl-9 ${styles.card}`}>
            <div className={`card-header ${styles.cardHeader}`}>
                <div className="card-title flex-column">
                    <h2>Details</h2>
                </div>

                <div className="card-toolbar">
                    <Button
                        appearance="blue"
                        className={`btn ${styles.editButton}`}
                        onClick={() => setOpenPopup("edit-reflection-question")}
                    >
                        Edit
                    </Button>
                </div>
            </div>
            <div className={`card-body ${styles.cardBody}`}>
                <div className={styles.item}>
                    <div className={styles.label}>ID</div>
                    <div className={styles.value}>{reflectionQuestion.id}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Title</div>
                    <div className={styles.value}>
                        {reflectionQuestion.title}
                    </div>
                </div>
                <div className={styles.item}>
                    <Button
                        className={styles.button}
                        appearance="red"
                        onClick={deleteReflectionQuestion}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

const mapState = () => ({});
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
};

const connector = connect(mapState, mapDispatch);

export const ReflectionQuestionDetails = connector(
    ReflectionQuestionDetailsComponent,
);
