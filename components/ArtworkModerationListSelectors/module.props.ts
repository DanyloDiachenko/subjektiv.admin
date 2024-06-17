import { ISelectVariant } from "../UI/Select/variant.interface";

export interface ArtworkModerationListSelectorsModuleProps {
    moderationStatuses: ISelectVariant[];
    moderationStatus: ISelectVariant | null;
    setModertionStatus: (status: ISelectVariant) => void;

    categories: ISelectVariant[];
    category: ISelectVariant | null;
    setCategory: (category: ISelectVariant) => void;

    onModerateClick: () => void;
    setOpenPopup: (popupToOpen: string) => void;

    artworksToModerate: number[];
}
