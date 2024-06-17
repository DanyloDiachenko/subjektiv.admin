"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "./general.module.scss";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { AddGeneralBtn } from "./AddGeneralBtn";
import Pagination from "@/components/UI/Pagination";
import apiClient from "@/api/apiClient";
import { IRootState } from "@/store";
import { storage } from "@/helpers/storage";
import { MainDataGetResponse } from "./generalTables.props";
import { MainDataIdResponse } from "@/components/GeneralDetails/general.props";
import { SubjectDto } from "@/submodules/common-dto/api-client/main/models/SubjectDto";
import { KeywordDto } from "@/submodules/common-dto/api-client/main/models/KeywordDto";
import { CategoryItemDto } from "@/submodules/common-dto/api-client/main/models/CategoryItemDto";
import { MaterialDto } from "@/submodules/common-dto/api-client/main/models/MaterialDto";
import { StyleDto } from "@/submodules/common-dto/api-client/main/models/StyleDto";
import { Tooltip } from "react-tooltip";
import { QuantitySelector } from "@/components/UI/QuantitySelector";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import imageService from "@/api/imageService";
import { TotalItems } from "@/components/UI/TotalItems";

interface ISubjectTables {
    data: MainDataGetResponse;
    page?: string;
    section: PlaceType;
    openPopup?: string;
    addNewGeneral?: {
        data: MainDataIdResponse;
        place: string;
    };
}

type PlaceType = "category" | "style" | "material" | "subject" | undefined;

const quantityPerPageVariants: ISelectVariant[] = [
    {
        title: "10",
        value: "10",
    },
    {
        title: "20",
        value: "20",
    },
    {
        title: "50",
        value: "50",
    },
];

const GeneralTablesComponent = ({
    data,
    page,
    addNewGeneral,
    section,
}: ISubjectTables) => {
    const [dataItems, setDataItems] = useState<
        (SubjectDto | KeywordDto | CategoryItemDto | MaterialDto | StyleDto)[]
    >(data.items);
    const [_, setSource] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(
        "total_pages" in data ? data.total_pages : 1,
    );
    const [total, setTotal] = useState("total" in data ? data.total : 0);
    const [quantityPerPage, setQuantityPerPage] = useState<ISelectVariant>(
        quantityPerPageVariants[0],
    );

    const fetchNextPage = async () => {
        if (page === ImageTargetEnum.Subject) {
            await apiClient.main.subjects
                .subjectControllerGetAll({ page: currentPage })
                .then((response) => {
                    setDataItems(response.items);
                    setCurrentPage(response.current_page);
                    setTotalPages(response.total_pages);
                    setTotal(response.total);
                });
        } else if (page === ImageTargetEnum.Style) {
            await apiClient.main.styles
                .styleControllerGetAll({ page: currentPage })
                .then((response) => {
                    setDataItems(response.items);
                    setCurrentPage(response.current_page);
                    setTotalPages(response.total_pages);
                    setTotal(response.total);
                });
        } else if (page === ImageTargetEnum.Material) {
            await apiClient.main.materials
                .materialControllerGetAll({ page: currentPage })
                .then((response) => {
                    setDataItems(response.items);
                    setCurrentPage(response.current_page);
                    setTotalPages(response.total_pages);
                    setTotal(response.total);
                });
        } else if (page === ImageTargetEnum.Keyword) {
            await apiClient.main.keywords
                .keywordControllerGetAll({ page: currentPage })
                .then((response) => {
                    setDataItems(response.items);
                    setCurrentPage(response.current_page);
                    setTotalPages(response.total_pages);
                    setTotal(response.total);
                });
        } else if (page === ImageTargetEnum.Category) {
            await apiClient.main.categories
                .categoryControllerGetAll({ page: currentPage })
                .then((response) => {
                    setDataItems(response.items);
                });
        }
    };

    useEffect(() => {
        if (addNewGeneral && page === addNewGeneral.place) {
            setDataItems([addNewGeneral.data, ...dataItems]);
        }
    }, [addNewGeneral, page]);

    useEffect(() => {
        fetchNextPage();
    }, [currentPage, page]);

    useEffect(() => {
        if (addNewGeneral && page !== addNewGeneral.place) {
            setDataItems([...dataItems]);
        }
    }, [page]);

    const returnEnumValue = () => {
        switch (section) {
            case "category": {
                return ImageTargetEnum.Category;
            }
            case "style": {
                return ImageTargetEnum.Style;
            }
            case "material": {
                return ImageTargetEnum.Material;
            }
            case "subject": {
                return ImageTargetEnum.Subject;
            }
        }

        return ImageTargetEnum.Category;
    };

    const returnImageSrc = (imageId: string | null) => {
        if (!imageId) {
            return "/media/Empty.png";
        }

        return imageService.getUrl(returnEnumValue(), null, imageId, "small");
    };

    return (
        <>
            <div className={`card-body py-4 ${styles.table}`}>
                <div className="d-flex justify-content-between align-items-center">
                    <Tooltip id="tooltip-pagintaion" />
                    <div
                        className="d-flex align-items-center position-relative my-1"
                        data-tooltip-content="Currently doesn`t work"
                        data-tooltip-id="tooltip-pagintaion"
                    >
                        <Image
                            className="position-absolute ms-5"
                            src="/media/search.svg"
                            alt="search"
                            width={14}
                            height={18}
                        />
                        <input
                            type="text"
                            className="form-control form-control-solid w-250px ps-13"
                            placeholder="Search"
                        />
                        <TotalItems number={total} />
                    </div>
                    <AddGeneralBtn page={page} />
                </div>
                <table
                    className={`table align-middle table-row-dashed fs-6 gy-5`}
                >
                    <thead>
                        <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th className={styles.thTitle}>TITLE</th>
                            {data &&
                                data.items &&
                                data.items.length > 0 &&
                                "slug" in data.items[0] && (
                                    <th className={styles.thSlug}>SLUG</th>
                                )}
                            <th className={styles.thId}>ID</th>
                            {data &&
                                data.items &&
                                data.items.length > 0 &&
                                "order_number" in data.items[0] && (
                                    <th className={styles.thSlug}>
                                        ORDER NUMBER
                                    </th>
                                )}
                            <th className={styles.thImage}>IMAGE ID</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                        {dataItems &&
                            dataItems.map((item, index) => (
                                <tr key={index}>
                                    <td className={` ${styles.avatarNameTd}`}>
                                        <Link
                                            href={`/app-settings/artwork/${page}/${item.id}`}
                                            onClick={() =>
                                                storage.setItem("page", page)
                                            }
                                            className={styles.linkTitle}
                                        >
                                            {item.id}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            href={`/app-settings/artwork/${page}/${item.id}`}
                                            onClick={() =>
                                                storage.setItem("page", page)
                                            }
                                            className={styles.linkTitle}
                                        >
                                            {item.title}
                                        </Link>
                                    </td>
                                    {"slug" in item && (
                                        <td
                                            className={` ${styles.avatarNameTd}`}
                                        >
                                            {item.slug}
                                        </td>
                                    )}
                                    <td>
                                        {"order_number" in item && (
                                            <>{item.order_number}</>
                                        )}
                                    </td>
                                    <td>
                                        <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                                            <Image
                                                src={returnImageSrc(
                                                    item.image_id,
                                                )}
                                                alt=""
                                                width={50}
                                                height={50}
                                                onError={() =>
                                                    setSource(
                                                        "/media/Empty.png",
                                                    )
                                                }
                                                className={styles.image}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.bottomContent}>
                <div>
                    <Tooltip id="tooltip-pagintaion" />
                    <div
                        data-tooltip-content="Currently doesn`t work"
                        data-tooltip-id="tooltip-pagintaion"
                    >
                        <QuantitySelector
                            quantityPerPage={quantityPerPage}
                            setQuantityPerPage={setQuantityPerPage}
                            quantityPerPageVariants={quantityPerPageVariants}
                        />
                    </div>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
};

const mapState = (state: IRootState) => ({
    openPopup: state.openPopup.openPopup,
    addNewGeneral: state.general.addNewGeneral,
});
const mapDispatch = {};
const connector = connect(mapState, mapDispatch);

export const GeneralTables = connector(GeneralTablesComponent);
