import { ArtworkImageDto } from "@/submodules/common-dto/api-client/main";

export interface EditMediaPopupProps {
    // artwork: MainAdminArtworkGetIdResponseDto;
    openPopup: string;
    closePopup: () => void;
    images: ArtworkImageDto[];
    alternativeImages: ArtworkImageDto[];
    // returnAlternativeImages: () => ArtworkImageDto[];
    // returnImages: () => ArtworkImageDto[];
}
