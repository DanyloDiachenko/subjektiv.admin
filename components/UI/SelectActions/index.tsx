"use client";

import Image from "next/image";
import { useState, useRef } from "react";

import styles from "./select.module.scss";
import { SelectActionsProps } from "./select.props";
import onClickOutside from "@/helpers/onClickOutside";
import { Tooltip } from "../Tootip";

export const SelectActions = ({
    placeholder,
    className,
}: SelectActionsProps): JSX.Element => {
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

    const selectWrapperRef = useRef<HTMLDivElement>(null);
    onClickOutside(selectWrapperRef, () => {
        setIsSelectOpen(false);
    });

    return (
        <div
            className={`${styles.wrapper} ${className}`}
            ref={selectWrapperRef}
            data-tooltip-content="Currently does`t work"
            data-tooltip-id="tooltip-actions"
        >
            <Tooltip id="tooltip-actions" />
            <div
                className={styles.arrowValue}
                /* onClick={() => setIsSelectOpen(!isSelectOpen)}
                onKeyDown={() => setIsSelectOpen(!isSelectOpen)} */
            >
                <span tabIndex={0} className={styles.value}>
                    {placeholder}
                </span>
                <Image
                    src="/media/arrow-select.svg"
                    alt="arrow"
                    width={10}
                    height={5}
                />
            </div>

            {isSelectOpen && (
                <ul>
                    <li>delete</li>
                    <li>edit</li>
                </ul>
            )}
        </div>
    );
};
