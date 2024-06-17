import { IPhoto } from "@/store/uploadPhoto/initStore";
import {
    ArtworkImageDto,
    MainAdminArtworkGetIdResponseDto,
} from "@/submodules/common-dto/api-client/main";

export interface AlternativeImagesProps {
    setAlternativeImages: (alternativeImages: ArtworkImageDto[]) => void;
    alternativeImages: ArtworkImageDto[];
    setUploadPhoto: (photo: IPhoto) => void;
    setOpenPopup: (popupToOpen: string) => void;
    artwork?: MainAdminArtworkGetIdResponseDto;
    artworkId: number;
    setDeletedAlternativeImg: (image: ArtworkImageDto[]) => void;
    deletedAlternativeImg: ArtworkImageDto[];
}
