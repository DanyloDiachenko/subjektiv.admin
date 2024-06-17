import { IPhoto } from "@/store/uploadPhoto/initStore";
import {
    ArtworkImageDto,
    MainAdminArtworkGetIdResponseDto,
} from "@/submodules/common-dto/api-client/main";

export interface ImagesProps {
    setArtwork: (artwork: MainAdminArtworkGetIdResponseDto) => void;
    images?: ArtworkImageDto[];
    setUploadPhoto: (photo: IPhoto) => void;
    setOpenPopup: (popupToOpen: string) => void;
    artwork?: MainAdminArtworkGetIdResponseDto;
    setImages: (images: ArtworkImageDto[]) => void;
    deletedImg?: ArtworkImageDto[];
    setDeletedImg: (images: ArtworkImageDto[]) => void;
}
