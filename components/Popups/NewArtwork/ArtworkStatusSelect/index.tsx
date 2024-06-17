"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import styles from "./styles.module.scss";
import useClickOutside from "@/helpers/useClickOutside";
import { ArtworkStatusSelectProps } from "./module.props";
import { ArtWorkStatus } from "@/submodules/common-dto/api-client/main";

export const ArtworkStatusSelect = ({
    status,
    onStatusClick,
}: ArtworkStatusSelectProps): JSX.Element => {
    const statuses = [
        {
            title: "In progress",
            key: ArtWorkStatus.IN_PROGRESS,
        },
        {
            title: "Available",
            key: ArtWorkStatus.IN_PROGRESS,
        },
        {
            title: "Not selling",
            key: ArtWorkStatus.NOT_SELLING,
        },
        {
            title: "Delivering",
            key: ArtWorkStatus.DELIVERING,
        },
        {
            title: "Sold",
            key: ArtWorkStatus.SOLD,
        },
    ];

    const [isOpened, setIsOpened] = useState<boolean>(false);

    const selectRef = useRef<HTMLUListElement | null>(null);
    useClickOutside(selectRef, () => setIsOpened(false));

    const onStatusClickHandler = (statusKey: ArtWorkStatus) => {
        onStatusClick(statusKey);
    };

    const returnStatus = () => {
        return statuses.find((statusOne) => statusOne.key === status)?.title;
    };

    return (
        <div className={styles.selectWrapper}>
            <div
                className={styles.selectContent}
                onClick={() => setIsOpened(!isOpened)}
            >
                <span>{returnStatus()}</span>
                <Image
                    src="/media/arrow-select.svg"
                    alt="arrow"
                    width="12"
                    height="8"
                />
            </div>
            {isOpened && (
                <ul className={styles.variants} ref={selectRef}>
                    {statuses.map((status, index) => (
                        <li
                            key={index}
                            onClick={() => onStatusClickHandler(status.key)}
                        >
                            {status.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
