"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import useClickOutside from "@/helpers/useClickOutside";
import { ArtworkMaterialsSelectProps } from "./module.props";
import apiClient from "@/api/apiClient";
import { MaterialDto } from "@/submodules/common-dto/api-client/main";

export const ArtworkMaterialsSelect = ({
    materialIds,
    addMaterialToPatchArtwork,
    removeMaterialFromPatchArtwork,
}: ArtworkMaterialsSelectProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [materials, setMaterials] = useState<MaterialDto[]>([]);

    const selectRef = useRef<HTMLUListElement | null>(null);
    useClickOutside(selectRef, () => setIsOpened(false));

    const getMaterials = async () => {
        try {
            const response =
                await apiClient.main.materials.materialControllerGetAll({
                    page: -1,
                });

            setMaterials(response.items);
        } catch (error) {
            console.log("error in gettings materials", error);
        }
    };

    useEffect(() => {
        getMaterials();
    }, []);

    const onMaterialClick = (material: MaterialDto) => {
        if (materialIds.includes(material.id)) {
            removeMaterialFromPatchArtwork(material.id);
        } else {
            addMaterialToPatchArtwork(material.id);
        }
    };

    const returnSelectedMaterials = () => {
        return materials
            .filter((material) => materialIds.includes(material.id))
            .map((material) => material.title)
            .join(", ");
    };

    return (
        <div className={styles.selectWrapper}>
            <div
                className={styles.selectContent}
                onClick={() => setIsOpened(!isOpened)}
            >
                <span>{returnSelectedMaterials()}</span>
                <Image
                    src="/media/arrow-select.svg"
                    alt="arrow"
                    width="12"
                    height="8"
                />
            </div>
            {isOpened && (
                <ul className={styles.variants} ref={selectRef}>
                    {materials.map((material, index) => (
                        <li
                            key={index}
                            onClick={() => onMaterialClick(material)}
                        >
                            {material.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
