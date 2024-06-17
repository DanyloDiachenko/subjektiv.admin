"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import stylesCss from "./styles.module.scss";
import useClickOutside from "@/helpers/useClickOutside";
import apiClient from "@/api/apiClient";
import { ArtworkSubjectSelectProps } from "./module.props";
import { MainStyleGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export const ArtworkSubjectSelect = ({
    onSubjectClick,
    subjectId,
}: ArtworkSubjectSelectProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [subjects, setSubjects] = useState<MainStyleGetIdResponseDto[]>([]);

    const selectRef = useRef<HTMLUListElement | null>(null);
    useClickOutside(selectRef, () => setIsOpened(false));

    const getSubjects = async () => {
        try {
            const response =
                await apiClient.main.subjects.subjectControllerGetAll({
                    page: -1,
                });

            if (response.items) {
                setSubjects(response.items);
            }
        } catch (error) {
            console.log("catch error getting subjects", error);
        }
    };

    useEffect(() => {
        getSubjects();
    }, []);

    const returnSubject = () => {
        return (
            subjects.find((subject) => subject.id === subjectId)?.title || ""
        );
    };

    return (
        <div className={stylesCss.selectWrapper}>
            <div
                className={stylesCss.selectContent}
                onClick={() => setIsOpened(!isOpened)}
            >
                <span>{returnSubject()}</span>
                <Image
                    src="/media/arrow-select.svg"
                    alt="arrow"
                    width="12"
                    height="8"
                />
            </div>
            {isOpened && (
                <ul className={stylesCss.variants} ref={selectRef}>
                    {subjects.map((subject, index) => (
                        <li
                            onClick={() => onSubjectClick(subject.id)}
                            key={index}
                        >
                            {subject.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
