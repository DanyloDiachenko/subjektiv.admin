import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainAdminArtworkGetIdResponseDto";

export interface ArtworkPhotoCardProps {
    artwork: MainAdminArtworkGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
    setImagePopup: (imageSrc: string) => void;
}
