import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface EditUserPopupProps {
    openPopup: string;
    closePopup: () => void;

    artwork: MainAdminArtworkGetIdResponseDto;
}
