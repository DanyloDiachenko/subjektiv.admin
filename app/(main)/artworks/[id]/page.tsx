import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import OneArtworkPage from "@/components/artworks/OneArtworkPage";
import {
    MainArtworkOrderGetResponseDto,
    MainArtworkPostGetResponseDto,
    MainArtworkReviewRequestGetResponseDto,
} from "@/submodules/common-dto/api-client/main";
import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainAdminArtworkGetIdResponseDto";
import { notFound } from "next/navigation";

type IProps = {
    params: {
        id: string;
    };
};

async function getOneArtwork(
    id: number,
): Promise<MainAdminArtworkGetIdResponseDto> {
    try {
        return await apiClient.main.adminArtwork.adminArtworkControllerGetArtwork(
            {
                id: id,
            },
        );
    } catch (error) {
        console.log("error", error);
        return notFound();
    }
}

async function getReviewRequests(artworkId: number) {
    try {
        return await apiClient.main.artworkReviewRequest.artworkReviewRequestControllerGet(
            {
                artworkId: artworkId,
            },
        );
    } catch (error) {
        console.log("error", error);
        return notFound();
    }
}

async function getPosts(artworkId: number) {
    try {
        return await apiClient.main.artworkPost.artworkPostControllerGetPosts({
            artworkId: artworkId,
            /*  postType: ArtworkPostType. */
        });
    } catch (error) {
        console.log("error", error);
    }
}

async function getArtworkOrders(artworkId: number) {
    try {
        return await apiClient.main.artworkOrder.artworkOrderControllerGetArtworkOrders(
            {
                artworkId: artworkId,
                /*  postType: ArtworkPostType. */
            },
        );
    } catch (error) {
        console.log("error", error);
    }
}

const Artwork = async ({ params: { id } }: IProps): Promise<JSX.Element> => {
    let reviewRequests: null | MainArtworkReviewRequestGetResponseDto = null;
    let postsResponse: null | MainArtworkPostGetResponseDto = null;
    let ordersResponse: null | MainArtworkOrderGetResponseDto = null;

    apiClientServerInit();

    const oneArtwork = await getOneArtwork(Number(id));

    postsResponse = (await getPosts(oneArtwork.id)) || {
        current_page: 1,
        total: 1,
        total_pages: 1,
        size: 1,
        items: [],
    };

    ordersResponse = (await getArtworkOrders(oneArtwork.id)) || {
        current_page: 1,
        total: 1,
        total_pages: 1,
        size: 1,
        items: [],
    };

    if (!oneArtwork.review) {
        reviewRequests = await getReviewRequests(oneArtwork.id);
    }

    return (
        <OneArtworkPage
            oneArtwork={oneArtwork}
            reviewRequests={reviewRequests}
            postsResponse={postsResponse}
            ordersResponse={ordersResponse}
        />
    );
};

export default Artwork;
