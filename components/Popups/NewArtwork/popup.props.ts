import { IEditMediaStore } from "@/store/editMedia/initStore";

export interface CreateArtworkPopupProps {
    openPopup: string;
    closePopup: () => void;

    images: IEditMediaStore["images"];
    alternativeImages: IEditMediaStore["images"];
}
