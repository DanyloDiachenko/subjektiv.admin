import { IEditMediaStore } from "@/store/editMedia/initStore";
import { IPhoto } from "@/store/uploadPhoto/initStore";
import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface AdjustImagePopupProps {
    openPopup: string;
    closePopup: () => void;
    setOpenPopup: (popupToOpen: string) => void;
    setUploadPhoto: (uploadPhoto: IPhoto) => void;
    uploadPhoto: IPhoto;

    artwork: MainAdminArtworkGetIdResponseDto;

    alternativeImages: IEditMediaStore["images"];
    setAlternativeImages: (images: IEditMediaStore["images"]) => void;

    images: IEditMediaStore["images"];
    setImages: (images: IEditMediaStore["images"]) => void;

    imagesPopupType: "" | "editMedia" | "newArtwork";
}
