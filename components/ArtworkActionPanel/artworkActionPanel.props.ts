import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface ArtworkActionPanelProps {
    artwork: MainAdminArtworkGetIdResponseDto;
    setArtworksToModerate: (artworksToModerate: number[]) => void;
    closePopup: () => void;
    setOpenPopup: (popupToOpen: string) => void;
}
