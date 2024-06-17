import {
    ArtWorkImageRatio,
    ArtWorkImageSide,
} from "@/submodules/common-dto/api-client/main";

interface IImage {
    id: number;
    image_id: string;
    artwork_id: number;
    side: ArtWorkImageSide;
    ratio: ArtWorkImageRatio;
    format: string;
    blob: Blob | null;
}

export interface IEditMediaStore {
    images: IImage[];
    alternativeImages: IImage[];
    imagesPopupType: "" | "editMedia" | "newArtwork";
}

export const initStore: IEditMediaStore = {
    images: [],
    alternativeImages: [],
    imagesPopupType: "",
};
