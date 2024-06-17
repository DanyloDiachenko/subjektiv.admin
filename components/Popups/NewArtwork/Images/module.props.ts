import { IPhoto } from "@/store/uploadPhoto/initStore";
import { ArtworkImageDto } from "@/submodules/common-dto/api-client/main";

export interface ImagesProps {
    images?: ArtworkImageDto[];
    setUploadPhoto: (photo: IPhoto) => void;
    setOpenPopup: (popupToOpen: string) => void;
    setImages: (images: ArtworkImageDto[]) => void;
    deletedImg?: ArtworkImageDto[];
    setDeletedImg: (images: ArtworkImageDto[]) => void;
}
