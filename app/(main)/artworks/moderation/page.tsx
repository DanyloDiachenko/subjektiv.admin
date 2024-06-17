import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { ArtworksModeration } from "@/components/Moderation";
import { MainAdminArtworkGetResponseDto } from "@/submodules/common-dto/api-client/main";

async function getArtworks(): Promise<MainAdminArtworkGetResponseDto> {
    try {
        return await apiClient.main.adminArtwork.adminArtworkControllerGetArtworks(
            {
                page: 1,
            },
        );
    } catch (error) {
        console.log(error);

        return {
            total_pages: 1,
            items: [],
            current_page: 1,
            total: 1,
            size: 1,
        };
    }
}

const Page = async () => {
    apiClientServerInit();

    const artworksResponse = await getArtworks();

    return <ArtworksModeration artworksResponse={artworksResponse} />;
};

export default Page;
