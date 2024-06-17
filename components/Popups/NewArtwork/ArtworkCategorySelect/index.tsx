"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import useClickOutside from "@/helpers/useClickOutside";
import apiClient from "@/api/apiClient";
import { CategoryItemDto } from "@/submodules/common-dto/api-client/main";
import { ArtworkCategorySelectProps } from "./module.props";

export const ArtworkCategorySelect = ({
    onCategoryClick,
}: ArtworkCategorySelectProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryItemDto[]>([]);
    const [activeCategoryTitle, setActiveCategoryTitle] = useState<string>("");

    const selectRef = useRef<HTMLUListElement | null>(null);
    useClickOutside(selectRef, () => setIsOpened(false));

    const getCategories = async () => {
        try {
            const response =
                await apiClient.main.categories.categoryControllerGetAll({});

            if (response.items) {
                setCategories(response.items);
            }
        } catch (error) {
            console.log("catch error getting categories", error);
        }
    };

    const setActiveCategory = (category: CategoryItemDto) => {
        setActiveCategoryTitle(category.title);
        onCategoryClick(category.id);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className={styles.selectWrapper}>
            <div
                className={styles.selectContent}
                onClick={() => setIsOpened(!isOpened)}
            >
                <span>{activeCategoryTitle}</span>
                <Image
                    src="/media/arrow-select.svg"
                    alt="arrow"
                    width="12"
                    height="8"
                />
            </div>
            {isOpened && (
                <ul className={styles.variants} ref={selectRef}>
                    {categories.map((category, index) => (
                        <li
                            onClick={() => setActiveCategory(category)}
                            key={index}
                        >
                            {category.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
