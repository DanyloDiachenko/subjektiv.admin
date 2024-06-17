import { ImageRatioEnum } from "@/submodules/common-dto/api-client/storage";

export interface IPhoto {
    urlPhoto: string;
    side: string;
    currentRatio: {
        title: string;
        field: ImageRatioEnum;
    } | null;
    file: null | Blob;
    format: string; // .png || .jpg...
}

export interface IUploadProps {
    uploadPhoto: IPhoto;
}

export const initStore: IUploadProps = {
    uploadPhoto: {
        urlPhoto: "",
        side: "",
        currentRatio: null,
        file: null,
        format: "",
    },
};
