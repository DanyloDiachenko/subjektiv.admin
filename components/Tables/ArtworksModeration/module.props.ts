import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import { ArtworkAdminItemDto } from "@/submodules/common-dto/api-client/main";

export interface ArtworksModerationTableProps {
    setOpenPopup: (popupToOpen: string) => void;

    onArtworkClick: (artworkId: number) => void;

    artworksToModerate: number[];
    setArtworksToModerate: (artworksToModerate: number[]) => void;

    artworks: ArtworkAdminItemDto[];
    artworksQuantityPerPage: ISelectVariant;
    setArworksQuantityPerPage: (quantity: ISelectVariant) => void;
    artworksQuantityPerPageVariants: ISelectVariant[];

    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}
