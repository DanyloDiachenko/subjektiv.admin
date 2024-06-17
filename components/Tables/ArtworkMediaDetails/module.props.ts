import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface ArtworkMediaDetailsTableProps {
    artwork: MainAdminArtworkGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
    setImagePopup: (imageSrc: string) => void;
}
