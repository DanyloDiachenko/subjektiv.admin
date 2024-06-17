import Image from "next/image";
import { useEffect } from "react";

import styles from "./pagination.module.scss";
import { PaginationProps } from "./pagination.props";
import { scrollElementToView } from "@/helpers/scrollElementToView";

const Pagination = ({
    currentPage,
    totalPages,
    setCurrentPage,
    elementId,
}: PaginationProps): JSX.Element => {
    const goToPrevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
            elementId && scrollElementToView(elementId);
        }
    };

    const goToNextPage = () => {
        if (currentPage !== totalPages && currentPage !== 0) {
            setCurrentPage(currentPage + 1);
            elementId && scrollElementToView(elementId);
        }
    };

    const goToClickedPage = (page: number) => {
        setCurrentPage(page);
        elementId && scrollElementToView(elementId);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const renderPages = () => {
        const pages = [];
        const maxAdjacentPages = 2;

        pages.push(1);
        if (totalPages > 1) {
            pages.push(2);
        }

        const startMiddle = Math.max(currentPage - maxAdjacentPages, 3);
        const endMiddle = Math.min(
            currentPage + maxAdjacentPages,
            totalPages - 2,
        );

        if (startMiddle > 3) {
            pages.push("ellipsis");
        }

        for (let i = startMiddle; i <= endMiddle; i++) {
            pages.push(i);
        }

        if (endMiddle < totalPages - 2) {
            pages.push("ellipsis");
        }

        if (totalPages > 3) {
            pages.push(totalPages - 1);
        }
        if (totalPages > 2) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <>
            {totalPages !== 0 ? (
                <div className={styles.pagination}>
                    <div
                        className={`${
                            currentPage === 1 ? styles.arrowBlocked : ""
                        }`}
                        onClick={goToPrevPage}
                    >
                        <Image
                            src="/media/arrow-left.svg"
                            alt="arrow previous page"
                            width={9}
                            height={14}
                        />
                    </div>
                    {renderPages().map((page, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (page !== "ellipsis") {
                                    goToClickedPage(page as number);
                                }
                            }}
                            className={`${styles.item} ${
                                page === currentPage ? styles.active : ""
                            } ${page === "ellipsis" ? styles.ellipsis : ""}`}
                        >
                            {page === "ellipsis" ? "..." : page}
                        </div>
                    ))}
                    <div
                        className={`${styles.nextPage} ${
                            currentPage === totalPages
                                ? styles.arrowBlocked
                                : ""
                        }`}
                        onClick={goToNextPage}
                    >
                        <Image
                            src="/media/arrow-left.svg"
                            alt="arrow previous page"
                            width={9}
                            height={14}
                        />
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default Pagination;
