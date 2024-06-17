import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import styles from "./select.module.scss";
import { SelectProps } from "./select.props";
import { ISelectVariant } from "./variant.interface";

export const Select = ({
    activeVariant,
    setActiveVariant,
    variants,
    className = "",
    placeholder,
    isSelectIsQuantitySelect,
    isRemoveArrow = true,
}: SelectProps): JSX.Element => {
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const [position, setPosition] = useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });

    const selectWrapperRef = useRef<HTMLDivElement>(null);
    const selectListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const updatePosition = () => {
            const wrapper = selectWrapperRef.current;

            if (wrapper) {
                const rect = wrapper.getBoundingClientRect();
                const scrollTop =
                    window.pageYOffset || document.documentElement.scrollTop;
                const top = rect.top + wrapper.offsetHeight + scrollTop + 10;
                const left = rect.left;

                setPosition({ top, left });
            }
        };

        const handleScroll = () => {
            if (isSelectOpen) {
                updatePosition();
            }
        };

        updatePosition();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updatePosition);
        };
    }, [isSelectOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isSelectOpen &&
                selectWrapperRef.current &&
                !selectWrapperRef.current.contains(event.target as Node) &&
                selectListRef.current &&
                !selectListRef.current.contains(event.target as Node)
            ) {
                setIsSelectOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSelectOpen]);

    const handleSelectClick = () => {
        setIsSelectOpen((prevState) => !prevState);
    };

    const handleOptionClick = (variant: ISelectVariant) => {
        setActiveVariant(variant);
        setIsSelectOpen(false);
    };

    const renderSelectList = () => (
        <ul
            className={styles.selectList}
            style={{ top: position.top, left: position.left }}
            id="select-list"
            ref={selectListRef}
        >
            {variants.map((variant, index) => (
                <li
                    key={index}
                    className={
                        activeVariant?.value === variant?.value
                            ? styles.active
                            : ""
                    }
                    onClick={() => handleOptionClick(variant)}
                >
                    {variant?.title}
                </li>
            ))}
        </ul>
    );

    return (
        <div
            className={`${styles.wrapper} ${className}`}
            ref={selectWrapperRef}
        >
            <div className={styles.arrowValue} onClick={handleSelectClick}>
                <span tabIndex={0} className={styles.value}>
                    {activeVariant?.title ? (
                        <>
                            <span className={styles.activeTitle}>
                                {activeVariant?.title}
                            </span>
                            {!isSelectIsQuantitySelect && isRemoveArrow && (
                                <Image
                                    src="/media/close.svg"
                                    alt=""
                                    width="10"
                                    height="10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveVariant(null);
                                    }}
                                    className={styles.closeIcon}
                                />
                            )}
                        </>
                    ) : (
                        placeholder
                    )}
                </span>
                <Image
                    src="/media/arrow-select.svg"
                    alt="arrow"
                    width={12}
                    height={8}
                />
            </div>
            {isSelectOpen &&
                ReactDOM.createPortal(renderSelectList(), document.body)}
        </div>
    );
};
