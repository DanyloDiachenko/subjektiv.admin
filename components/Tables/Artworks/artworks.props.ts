import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import {
    ArtworkAdminItemDto,
    SortOrder,
} from "@/submodules/common-dto/api-client/main";

export interface ArtworksTableProps {
    artworks: ArtworkAdminItemDto[];
    artworksQuantityPerPage: ISelectVariant;
    setArworksQuantityPerPage: (variant: ISelectVariant) => void;
    artworksQuantityPerPageVariants: ISelectVariant[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    onThClick: (sortField: "id" | "title", sortOrder: SortOrder) => void;
}
