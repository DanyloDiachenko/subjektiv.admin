"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";

import { SelectOptionProps, SelectOptionType } from "./select.props";
import useClickOutside from "@/helpers/useClickOutside";

export const SelectOption = ({
    variants,
    setVariant,
    placeholder,
    activeValue,
    errorMessage,
    isShowArrow = false,
}: SelectOptionProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const [activeCategoryTitle, setActiveCategoryTitle] = useState<string>("");

    const selectRef = useRef<HTMLUListElement | null>(null);
    useClickOutside(selectRef, () => setIsOpened(false));

    const setActiveCategory = (variant: SelectOptionType) => {
        setActiveCategoryTitle(variant!.title);
        setVariant!(variant);
        setIsOpened(false);
    };
    const capitalize = (string: string) => {
        if (string.length === 0) {
            return null;
        } else {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    };
    useEffect(() => {
        setActiveCategoryTitle(activeValue!);
    }, [activeValue]);

    return (
        <>
            {" "}
            <div className={styles.selectWrapper}>
                <div
                    className={`${styles.selectContent} ${
                        errorMessage && styles.error
                    }`}
                    onClick={() => !isShowArrow && setIsOpened(!isOpened)}
                >
                    {activeCategoryTitle ? (
                        <span className={styles.activeSelect}>
                            {capitalize(activeCategoryTitle)}
                        </span>
                    ) : (
                        <span className={styles.inputPlaceholder}>
                            {placeholder}
                        </span>
                    )}
                    {!isShowArrow && (
                        <Image
                            src="/media/arrow-select.svg"
                            alt="arrow"
                            width="12"
                            height="8"
                        />
                    )}
                </div>

                <ul
                    className={`${styles.variants} ${
                        isOpened ? styles.open : styles.close
                    }`}
                    ref={selectRef}
                >
                    {variants &&
                        variants.map((variant, index) => (
                            <li
                                onClick={() => {
                                    setActiveCategory(variant);
                                }}
                                key={index}
                                className={styles.variantsItem}
                            >
                                {variant!.title}
                            </li>
                        ))}
                </ul>
            </div>
            <div className={styles.errorMessage}>{errorMessage}</div>
        </>
    );
};
