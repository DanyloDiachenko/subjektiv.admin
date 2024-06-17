import {
    MainAdminArtworkGetIdResponseDto,
    MainArtworkReviewRequestGetResponseDto,
} from "@/submodules/common-dto/api-client/main";

export interface ArtworkExpertHistoryProps {
    artwork: MainAdminArtworkGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
    reviewRequests: MainArtworkReviewRequestGetResponseDto | null;
}
