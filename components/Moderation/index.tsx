"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { ArtworksModerationTable } from "@/components/Tables/ArtworksModeration";
import { ArtworkModerationListSelectors } from "@/components/ArtworkModerationListSelectors";
import { ModerateArtworkPopup } from "@/components/Popups/ModerateArtwork";
import {
    ArtworkAdminItemDto,
    MainAdminArtworkGetIdResponseDto,
} from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { IRootState } from "@/store";
import { TotalItems } from "../UI/TotalItems";
import { ArtworksModerationProps } from "./moderation.props";

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
        title: "Moderation",
        url: "/artworks/moderation",
    },
    {
        title: "Primary moderation",
        url: "/artworks/moderation",
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

const moderationStatuses: ISelectVariant[] = [
    {
        title: "All Good",
        value: "allGood",
    },
    {
        title: "Reject",
        value: "reject",
    },
    {
        title: "Not public",
        value: "notPublic",
    },
    {
        title: "Pending",
        value: "pending",
    },
];

const ArtworksModerationComponent = ({
    artworksToModerate,
    closePopup,
    setArtworksToModerate,
    artworksResponse,
}: ArtworksModerationProps): JSX.Element => {
    const [editedArtwork, setEditedArtwork] =
        useState<MainAdminArtworkGetIdResponseDto | null>(null);
    const [artworksQuantityPerPage, setArworksQuantityPerPage] =
        useState<ISelectVariant>(artworksQuantityPerPageVariants[0]);
    const [currentPage, setCurrentPage] = useState<number>(
        artworksResponse.current_page,
    );
    const [totalPages, setTotalPages] = useState<number>(
        artworksResponse.total_pages,
    );
    const [total, setTotal] = useState<number>(artworksResponse.total);
    const [artworks, setArtworks] = useState<ArtworkAdminItemDto[]>(
        artworksResponse.items,
    );
    const [categories, _] = useState<ISelectVariant[]>([]);
    const [category, setCategory] = useState<ISelectVariant | null>(null);
    const [moderationStatus, setModerationStatus] =
        useState<ISelectVariant | null>(null);
    const [searchArtwork, setSearchArtwork] = useState<string>("");

    const returnModerionStatusToQuery = () => {
        if (!moderationStatus) return undefined;

        switch (moderationStatus?.title) {
            case "All Good": {
                return {
                    isModerated: true,
                    isPublic: true,
                    isActive: true,
                };
            }
            case "Reject": {
                return {
                    isModerated: true,
                    isPublic: false,
                    isActive: false,
                };
            }
            case "Not public": {
                return {
                    isModerated: true,
                    isPublic: false,
                    isActive: true,
                };
            }
            case "Pending": {
                return {
                    isModerated: false,
                };
            }
        }
    };

    const returnActiveArtIndex = () => {
        if (!editedArtwork) return 1;

        const artIndex = artworksToModerate.findIndex(
            (artIndex) => artIndex === editedArtwork.id,
        );

        if (artIndex) {
            return artIndex + 1;
        } else {
            return 1;
        }
    };

    const getArtworksList = async (updatedPage?: number) => {
        try {
            const searchQuery =
                searchArtwork.length >= 3 ? searchArtwork : undefined;

            const response =
                await apiClient.main.adminArtwork.adminArtworkControllerGetArtworks(
                    {
                        page: updatedPage ? updatedPage : currentPage,
                        categoryIds: category
                            ? [Number(category.value)]
                            : undefined,
                        ...returnModerionStatusToQuery(),
                        search: searchQuery,
                    },
                );

            if (response.items) {
                console.log(response);

                setTotalPages(response.total_pages);
                setArtworks(response.items);
                setCurrentPage(response.current_page);
                setTotal(response.total);
            } else {
                setArtworks([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getArtworksList(1);
    }, [artworksQuantityPerPage, category, moderationStatus, searchArtwork]);

    useEffect(() => {
        getArtworksList();
    }, [currentPage]);

    const onArtworkClick = async (artworkId: number) => {
        try {
            const response =
                await apiClient.main.adminArtwork.adminArtworkControllerGetArtwork(
                    {
                        id: artworkId,
                    },
                );

            setEditedArtwork(response);
        } catch (error) {
            console.log(error);
        }
    };

    const onReasonClick = (reasonTitle: string) => {
        if (!editedArtwork) {
            return;
        }

        switch (reasonTitle) {
            case "All Good (by default)": {
                setEditedArtwork({
                    ...editedArtwork,
                    is_moderated: true,
                    is_public: true,
                    is_active: true,
                });
                break;
            }
            case "Reject": {
                setEditedArtwork({
                    ...editedArtwork,
                    is_moderated: true,
                    is_public: false,
                    is_active: false,
                });
                break;
            }
            case "Not public": {
                setEditedArtwork({
                    ...editedArtwork,
                    is_moderated: true,
                    is_public: false,
                    is_active: true,
                });
                break;
            }
        }
    };

    const confirmModerateArtwork = async () => {
        if (!editedArtwork) return;

        try {
            const response =
                await apiClient.main.adminArtwork.adminArtworkControllerUpdateArtwork(
                    {
                        id: editedArtwork.id,
                        requestBody: {
                            is_moderated: editedArtwork.is_moderated,
                            is_public: editedArtwork.is_public,
                            is_active: editedArtwork.is_active,
                        },
                    },
                );
            if (response.success) {
                const nextArtworkIndex = artworksToModerate.findIndex(
                    (artworkId) => artworkId === editedArtwork.id,
                );

                getArtworksList();

                if (nextArtworkIndex !== -1) {
                    const nextArtwork =
                        artworksToModerate[nextArtworkIndex + 1];
                    if (nextArtwork) {
                        onArtworkClick(nextArtwork);
                    } else {
                        closePopup();
                        setArtworksToModerate([]);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const skip = () => {
        if (!editedArtwork) return;

        const nextArtworkIndex = artworksToModerate.findIndex(
            (artworkId) => artworkId === editedArtwork.id,
        );

        if (nextArtworkIndex === artworksToModerate.length - 1) {
            closePopup();
            setArtworksToModerate([]);

            return;
        }

        const nextArtwork = artworksToModerate[nextArtworkIndex + 1];

        getArtworksList();

        if (nextArtwork) {
            onArtworkClick(nextArtwork);
        } else {
            closePopup();
            setArtworksToModerate([]);
        }
    };

    const onModerateClick = () => {
        onArtworkClick(artworksToModerate[0]);
    };

    return (
        <>
            {editedArtwork?.id && (
                <ModerateArtworkPopup
                    artwork={editedArtwork}
                    onReasonClick={onReasonClick}
                    confirm={confirmModerateArtwork}
                    totalArtworks={
                        artworksToModerate.length
                            ? artworksToModerate.length
                            : 1
                    }
                    currentArtworkIndex={returnActiveArtIndex()}
                    skip={skip}
                />
            )}
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
                <div className="art-moderation">
                    <div className="content">
                        <div className="link active">Primary moderation</div>
                        <div className="link">Complaints</div>
                    </div>
                </div>

                <div className="app-content flex-column-fluid">
                    <div className="app-container ">
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
                                <ArtworkModerationListSelectors
                                    categories={categories}
                                    category={category ? category : null}
                                    setCategory={setCategory}
                                    moderationStatuses={moderationStatuses}
                                    moderationStatus={
                                        moderationStatus
                                            ? moderationStatus
                                            : null
                                    }
                                    setModertionStatus={setModerationStatus}
                                    onModerateClick={onModerateClick}
                                />
                            </div>
                            <ArtworksModerationTable
                                onArtworkClick={(artworkId) =>
                                    onArtworkClick(artworkId)
                                }
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapState = (state: IRootState) => ({
    artworksToModerate: state.artworksToModerate.artworksToModerate,
});
const mapDispatch = {
    closePopup: () => ({
        type: "CLOSE_POPUP",
    }),
    setArtworksToModerate: (artworksToModerate: number[]) => ({
        type: "SET_ARTWORKS_TO_MODERATE",
        artworksToModerate,
    }),
};

const connector = connect(mapState, mapDispatch);

export const ArtworksModeration = connector(ArtworksModerationComponent);
