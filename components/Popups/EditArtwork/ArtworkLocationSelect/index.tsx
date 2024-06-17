"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import styles from "./styles.module.scss";
import useClickOutside from "@/helpers/useClickOutside";

export const ArtworkLocationSelect = (): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const selectRef = useRef<HTMLUListElement | null>(null);
    useClickOutside(selectRef, () => setIsOpened(false));

    return (
        <div className={styles.selectWrapper}>
            <div
                className={styles.selectContent}
                onClick={() => setIsOpened(!isOpened)}
            >
                <span>United Kingdom</span>
                <Image
                    src="/media/arrow-select.svg"
                    alt="arrow"
                    width="12"
                    height="8"
                />
            </div>
            {isOpened && (
                <ul className={styles.variants} ref={selectRef}>
                    <li>text 1</li>
                    <li>text 2</li>
                    <li>text 3</li>
                    <li>text 4</li>
                    <li>text 5</li>
                    <li>text 1</li>
                    <li>text 2</li>
                    <li>text 3</li>
                    <li>text 4</li>
                    <li>text 5</li>
                </ul>
            )}
        </div>
    );
};
