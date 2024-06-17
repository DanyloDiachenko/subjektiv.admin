import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface ModerateArtworkPopupProps {
    openPopup: string;
    closePopup: () => void;
    setArtworksToModerate: (artworksToModerate: number[]) => void;

    artwork: MainAdminArtworkGetIdResponseDto;
    onReasonClick: (reasonTitle: string) => void;

    confirm: () => void;
    skip: () => void;

    totalArtworks: number;
    currentArtworkIndex: number;
}
