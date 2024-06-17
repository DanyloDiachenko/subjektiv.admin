"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import stylesCss from "./styles.module.scss";
import useClickOutside from "@/helpers/useClickOutside";
import apiClient from "@/api/apiClient";
import { ArtworkStyleSelectProps } from "./module.props";
import { MainStyleGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export const ArtworkStyleSelect = ({
    onStyleClick,
    styleId,
}: ArtworkStyleSelectProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [styles, setStyles] = useState<MainStyleGetIdResponseDto[]>([]);
    const [activeStyleTitle, setActiveStyleTitle] = useState<string>("");

    const selectRef = useRef<HTMLUListElement | null>(null);
    useClickOutside(selectRef, () => setIsOpened(false));

    const getStyleById = async () => {
        try {
            const response =
                await apiClient.main.styles.styleControllerGetStyle({
                    idOrSlug: styleId,
                });

            if (response.title) {
                setActiveStyleTitle(response.title);
            }
        } catch (error) {
            console.log("catch error getting category", error);
        }
    };

    const getStyles = async () => {
        try {
            const response = await apiClient.main.styles.styleControllerGetAll({
                page: -1,
            });

            if (response.items) {
                setStyles(response.items);
            }
        } catch (error) {
            console.log("catch error getting categories", error);
        }
    };

    const setActiveStyle = (style: MainStyleGetIdResponseDto) => {
        setActiveStyleTitle(style.title);
        onStyleClick(style.id);
    };

    useEffect(() => {
        getStyles();
        getStyleById();
    }, []);

    return (
        <div className={stylesCss.selectWrapper}>
            <div
                className={stylesCss.selectContent}
                onClick={() => setIsOpened(!isOpened)}
            >
                <span>{activeStyleTitle}</span>
                <Image
                    src="/media/arrow-select.svg"
                    alt="arrow"
                    width="12"
                    height="8"
                />
            </div>
            {isOpened && (
                <ul className={stylesCss.variants} ref={selectRef}>
                    {styles.map((style, index) => (
                        <li onClick={() => setActiveStyle(style)} key={index}>
                            {style.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
