import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface ArtworkDetailsProps {
    artwork: MainAdminArtworkGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
}
