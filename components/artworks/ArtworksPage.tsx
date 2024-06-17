"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ArtworkListSelectors } from "@/components/ArtworkListSelectors";
import { ArtworksTableComponent } from "@/components/Tables/Artworks";
import apiClient from "@/api/apiClient";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import {
    ArtWorkStatus,
    ArtworkAdminItemDto,
    MainAdminArtworkGetResponseDto,
    SortOrder,
} from "@/submodules/common-dto/api-client/main";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TotalItems } from "../UI/TotalItems";

interface IArtworks {
    allArtworks: MainAdminArtworkGetResponseDto;
}

const returnYearVariants = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2022;
    const yearArray: ISelectVariant[] = [];

    for (let year = startYear; year <= currentYear; year++) {
        yearArray.push({ title: year.toString(), value: year.toString() });
    }

    return yearArray.reverse();
};

const routes = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "Artwork Management",
        url: "/artworks",
    },
    {
        title: "All Artworks",
        url: "/artworks",
    },
];

const artworksQuantityPerPageVariants: ISelectVariant[] = [
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
    {
        title: "100",
        value: "100",
    },
];

const artworkStatuses: ISelectVariant[] = [
    {
        title: "In progress",
        value: "inProgress",
    },
    {
        title: "Available",
        value: "available",
    },
    {
        title: "Not selling",
        value: "notSelling",
    },
    {
        title: "Delivering",
        value: "delivering",
    },
    {
        title: "Sold",
        value: "sold",
    },
];

const yearVariants: ISelectVariant[] = returnYearVariants();

const priceVariants: ISelectVariant[] = [
    {
        title: "Under €500",
        value: "0, 50000",
    },
    {
        title: "€500 - €1,000",
        value: "50000, 100000",
    },
    {
        title: "€1,000 - €2,000",
        value: "100000, 200000",
    },
    {
        title: "€2,000 - €5,000",
        value: "200000, 500000",
    },
    {
        title: "€5,000 - €10,000",
        value: "500000, 1000000",
    },
    {
        title: "Over €10,000",
        value: "10000000, 999999999",
    },
];

const ArtworksPage = ({ allArtworks }: IArtworks): JSX.Element => {
    const [artworksQuantityPerPage, setArworksQuantityPerPage] =
        useState<ISelectVariant>(artworksQuantityPerPageVariants[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(
        allArtworks.total_pages,
    );
    const [artworks, setArtworks] = useState<ArtworkAdminItemDto[]>(
        allArtworks.items,
    );
    const [total, setTotal] = useState<number>(allArtworks.total);
    const [categories, setCategories] = useState<ISelectVariant[]>([]);
    const [category, setCategory] = useState<ISelectVariant | null>(null);
    const [artworkStatus, setArtworkStatus] = useState<ISelectVariant | null>(
        null,
    );
    const [year, setYear] = useState<ISelectVariant | null>(null);
    const [price, setPrice] = useState<ISelectVariant | null>(null);
    const [searchArtwork, setSearchArtwork] = useState<string>("");

    const getArtworksList = async (
        sortField?: "id" | "title",
        sortOrder?: SortOrder,
        updatedPage?: number,
    ) => {
        try {
            const searchQuery =
                searchArtwork.length >= 3 ? searchArtwork : undefined;
            let createDateFrom: string | undefined = undefined;
            let createDateTo: string | undefined = undefined;

            if (year) {
                const yearValue = parseInt(year.value);
                if (!isNaN(yearValue)) {
                    createDateFrom = new Date(yearValue, 0, 1).toISOString();
                    createDateTo = new Date(yearValue, 11, 31).toISOString();
                }
            }

            let priceMin: number | undefined = undefined;
            let priceMax: number | undefined = undefined;

            if (price) {
                const [minPrice, maxPrice] = price.value.split(",").map(Number);
                if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                    priceMin = minPrice;
                    priceMax = maxPrice;
                }
            }

            const response =
                await apiClient.main.adminArtwork.adminArtworkControllerGetArtworks(
                    {
                        page: updatedPage ? updatedPage : currentPage,
                        categoryIds: category
                            ? [Number(category.value)]
                            : undefined,
                        statuses: artworkStatus
                            ? [artworkStatus.value as ArtWorkStatus]
                            : undefined,
                        search: searchQuery,
                        createDateFrom,
                        createDateTo,
                        priceMin,
                        priceMax,
                        sortField: sortField,
                        sortOrder: sortOrder,
                    },
                );

            if (response.items) {
                setTotalPages(response.total_pages);
                setArtworks(response.items);
                setTotal(response.total);
            } else {
                setArtworks([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCategories = async () => {
        try {
            const response =
                await apiClient.main.categories.categoryControllerGetAll({});

            if (response.items) {
                const responseCategoriesToSelectVariants: ISelectVariant[] =
                    response.items.map((category) => ({
                        title: category.title,
                        value: category.id.toString(),
                    }));

                setCategories(responseCategoriesToSelectVariants);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getArtworksList();
    }, [currentPage]);

    useEffect(() => {
        getArtworksList(undefined, undefined, 1);
    }, [
        artworksQuantityPerPage,
        category,
        artworkStatus,
        year,
        searchArtwork,
        price,
    ]);

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <div className="d-flex flex-column flex-column-fluid">
                <div className="app-toolbar py-3 py-lg-6">
                    <div className="app-container  d-flex flex-stack">
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                All Artworks
                            </h1>
                            <Breadcrumbs routes={routes} />
                        </div>
                    </div>
                </div>
                <div className="app-content flex-column-fluid">
                    <div className="app-container  ">
                        <div className="card">
                            <div className="card-header border-0 pt-6">
                                <div className="card-title">
                                    <div className="d-flex align-items-center position-relative my-1">
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
                                            value={searchArtwork}
                                            onChange={(event) =>
                                                setSearchArtwork(
                                                    event.target.value,
                                                )
                                            }
                                        />
                                        <TotalItems number={total} />
                                    </div>
                                </div>

                                <ArtworkListSelectors
                                    artworkStatuses={artworkStatuses}
                                    categories={categories}
                                    category={category ? category : null}
                                    setCategory={setCategory}
                                    artworkStatus={
                                        artworkStatus ? artworkStatus : null
                                    }
                                    setArtworkStatus={setArtworkStatus}
                                    year={year ? year : null}
                                    years={yearVariants}
                                    setYear={setYear}
                                    price={price}
                                    prices={priceVariants}
                                    setPrice={setPrice}
                                />
                            </div>
                            <ArtworksTableComponent
                                artworks={artworks}
                                artworksQuantityPerPage={
                                    artworksQuantityPerPage
                                }
                                setArworksQuantityPerPage={
                                    setArworksQuantityPerPage
                                }
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                                artworksQuantityPerPageVariants={
                                    artworksQuantityPerPageVariants
                                }
                                onThClick={getArtworksList}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArtworksPage;
