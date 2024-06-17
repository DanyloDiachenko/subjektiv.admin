import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface ArtworkMediaDetailsProps {
    artwork: MainAdminArtworkGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;

    setImagesPopupType: (
        imagesPopupType: "" | "editMedia" | "newArtwork",
    ) => void;
}
