import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface EditExpertReviewPopupProps {
    artwork: MainAdminArtworkGetIdResponseDto;
    closePopup: () => void;
}
