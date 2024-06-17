import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import ArtworksPage from "@/components/artworks/ArtworksPage";
import { MainAdminArtworkGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainAdminArtworkGetResponseDto";

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

const Artworks = async (): Promise<JSX.Element> => {
    apiClientServerInit();

    const artworks = await getArtworks();

    return <ArtworksPage allArtworks={artworks} />;
};

export default Artworks;
