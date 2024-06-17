import { ISelectVariant } from "../UI/Select/variant.interface";

export interface ArtworkListSelectorsProps {
    setOpenPopup: (popupToOpen: string) => void;
    setImagesPopupType: (
        imagesPopupType: "" | "editMedia" | "newArtwork",
    ) => void;

    artworkStatuses: ISelectVariant[];
    artworkStatus: ISelectVariant | null;
    setArtworkStatus: (status: ISelectVariant) => void;

    categories: ISelectVariant[];
    category: ISelectVariant | null;
    setCategory: (category: ISelectVariant) => void;

    years: ISelectVariant[];
    year: ISelectVariant | null;
    setYear: (year: ISelectVariant) => void;

    prices: ISelectVariant[];
    price: ISelectVariant | null;
    setPrice: (price: ISelectVariant) => void;
}
