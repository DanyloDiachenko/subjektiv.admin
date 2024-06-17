"use client";

import { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import Pagination from "@/components/UI/Pagination";
import { ReflectionsQuestionsTableProps } from "./module.props";

import { Button } from "@/components/UI/Button";
import Image from "next/image";
import Link from "next/link";
import apiClient from "@/api/apiClient";
import { ArtworkCommentQuestionDto } from "@/submodules/common-dto/api-client/main/models/ArtworkCommentQuestionDto";
import { TotalItems } from "@/components/UI/TotalItems";

const ReflectionQuestionsTableComponent = ({
    reflectionQuestions,
    setOpenPopup,
}: ReflectionsQuestionsTableProps) => {
    const [questions, setQuestions] = useState<ArtworkCommentQuestionDto[]>(
        reflectionQuestions.items,
    );
    const [currentPage, setCurrentPage] = useState<number>(
        reflectionQuestions.current_page,
    );
    const [totalPages, setTotalPages] = useState<number>(
        reflectionQuestions.total_pages,
    );
    const [total, setTotal] = useState(reflectionQuestions.total);

    const getReflectionQuestions = async () => {
        try {
            const questions =
                await apiClient.main.commentQuestion.artworkCommentQuestionControllerGetAll(
                    {
                        page: currentPage,
                    },
                );

            setQuestions(questions.items);
            setTotal(questions.total);
            setTotalPages(questions.total_pages);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getReflectionQuestions();
    }, []);

    return (
        <>
            <div className={`card-body py-4 ${styles.table}`}>
                <div className={styles.newCountryWrapper}>
                    <TotalItems number={total} />
                    <Button
                        appearance="blue"
                        className={styles.newCountryButton}
                        onClick={() => setOpenPopup("reflectionQuestion")}
                    >
                        <span className={styles.plus}>
                            <Image
                                src="/media/plus.svg"
                                alt="plus"
                                width="18"
                                height="18"
                            />
                        </span>
                        <span>New question</span>
                    </Button>
                </div>
                <table
                    className={`table align-middle table-row-dashed fs-6 gy-5`}
                >
                    <thead>
                        <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th className={styles.thCountryId}>ID</th>
                            <th className={styles.thCountryTitle}>TITLE</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                        {questions.map((question, index) => (
                            <tr key={index}>
                                <td>
                                    <Link
                                        href={
                                            "/reflection-questions/" +
                                            question.id
                                        }
                                        className={styles.linkTitle}
                                    >
                                        {question.id}
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        href={
                                            "/reflection-questions/" +
                                            question.id
                                        }
                                        className={styles.linkTitle}
                                    >
                                        {question.title}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.bottomContent}>
                <div></div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
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

export const ReflectionQuestionsTable = connector(
    ReflectionQuestionsTableComponent,
);
