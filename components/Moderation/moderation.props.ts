import { MainAdminArtworkGetResponseDto } from "@/submodules/common-dto/api-client/main";

export interface ArtworksModerationProps {
    artworksResponse: MainAdminArtworkGetResponseDto;
    artworksToModerate: number[];
    closePopup: () => void;
    setArtworksToModerate: (artworksToModerate: number[]) => void;
}
