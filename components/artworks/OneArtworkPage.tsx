"use client";

import { connect } from "react-redux";

import { Navbar } from "@/components/Navbar";
import { ITab } from "@/components/Navbar/tab.interface";
import { ArtworksDetails } from "@/components/ArtworkDetails";
import { ArtworkActionPanel } from "@/components/ArtworkActionPanel";
import { ArtworkMediaDetails } from "@/components/ArtworkMediaDetails";
import {
    ArtworkImageDto,
    MainAdminArtworkGetIdResponseDto,
    MainArtworkOrderGetResponseDto,
    MainArtworkPostGetResponseDto,
    MainArtworkReviewRequestGetResponseDto,
} from "@/submodules/common-dto/api-client/main";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { IArtworkStore } from "@/store/artwork/initStore";
import ArtworkPhotoCard from "../ArtworkCard";
import { ArtworkExpertHistory } from "../ArtworkExpertHistory";
import { ArtworkPosts } from "../ArtworkPosts";
import { useEffect } from "react";
import UsersArtistOwnerExpertBlock from "../UsersArtistOwnerExpertBlock";
import { ArtworkPurchaseInfo } from "../ArtworkPurchaseInfo";
import { ArtworksShippingDetails } from "../ArtworkShippingDetails";

interface IProps {
    setAlternativeImages: (alternativeImages: ArtworkImageDto[]) => void;
    setImages: (images: ArtworkImageDto[]) => void;
    oneArtwork: MainAdminArtworkGetIdResponseDto;
    setArtwork: (artwork: MainAdminArtworkGetIdResponseDto) => void;
    artwork: MainAdminArtworkGetIdResponseDto;
    reviewRequests: MainArtworkReviewRequestGetResponseDto | null;
    postsResponse: MainArtworkPostGetResponseDto;
    ordersResponse: MainArtworkOrderGetResponseDto;
}

const tabs: ITab[] = [
    {
        title: "Artwork info",
        link: "artworkDetails",
    },
    {
        title: "Media content",
        link: "mediaDetails",
    },
    {
        title: "Artwork posts",
        link: "artworkPosts",
    },
    {
        title: "Shipping details",
        link: "shippingDetails",
    },
    {
        title: "Expert history",
        link: "expertHistory",
    },
];

const routes = [
    {
        title: "Artwork Management",
        url: "/artworks",
    },
    {
        title: "All Artworks",
        url: "/artworks",
    },
    {
        title: "Artwork Detail",
        url: "/artworks",
    },
];

const OneArtworkPage = ({
    oneArtwork,
    artwork,
    setArtwork,
    reviewRequests,
    postsResponse,
    ordersResponse,
}: IProps): JSX.Element => {
    useEffect(() => {
        setArtwork(oneArtwork);
    }, []);

    if (!artwork) {
        return <></>;
    }

    return (
        <>
            <div className="d-flex flex-column flex-column-fluid">
                <div className="app-toolbar py-3 py-lg-6">
                    <div className="app-container  d-flex flex-stack">
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                {oneArtwork.title}
                            </h1>
                            <Breadcrumbs routes={routes} />
                        </div>
                    </div>
                </div>
                <div className="app-content flex-column-fluid">
                    <div className="app-container ">
                        <div className="d-flex flex-column flex-lg-row">
                            <div className="flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10">
                                <ArtworkPhotoCard artwork={oneArtwork} />
                                <UsersArtistOwnerExpertBlock
                                    owner={oneArtwork.owner}
                                    author={artwork.author}
                                    expert={oneArtwork.pending_expert?.expert}
                                />
                                <ArtworkActionPanel artwork={oneArtwork} />
                            </div>

                            <div className="flex-lg-row-fluid ms-lg-15">
                                <Navbar tabs={tabs} />
                                <div className="tab-content">
                                    <div
                                        className="tab-pane show active"
                                        role="tabpanel"
                                    >
                                        <ArtworksDetails artwork={oneArtwork} />
                                        <ArtworkMediaDetails
                                            artwork={oneArtwork}
                                        />
                                        <ArtworkPosts
                                            postsResponse={postsResponse}
                                        />
                                        <ArtworkExpertHistory
                                            artwork={oneArtwork}
                                            reviewRequests={reviewRequests}
                                        />
                                        <ArtworksShippingDetails
                                            artwork={oneArtwork}
                                        />
                                        <ArtworkPurchaseInfo
                                            ordersResponse={ordersResponse}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapState = (state: { artwork: IArtworkStore }) => {
    return {
        artwork: state.artwork.artwork,
    };
};
const mapDispatch = {
    setArtwork: (artwork: MainAdminArtworkGetIdResponseDto) => ({
        type: "SET_ARTWORK",
        artwork,
    }),
    setAlternativeImages: (alternativeImages: ArtworkImageDto[]) => ({
        type: "SET_ALTERNATIVE_IMAGES",
        alternativeImages,
    }),
    setImages: (images: ArtworkImageDto[]) => ({
        type: "SET_IMAGES",
        images,
    }),
};
const connector = connect(mapState, mapDispatch);

export default connector(OneArtworkPage);
