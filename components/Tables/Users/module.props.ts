import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import {
    AdminUserItemDto,
    AdminUserSortingFields,
    SortOrder,
} from "@/submodules/common-dto/api-client/main";

export interface UsersTableProps {
    users: AdminUserItemDto[];
    usersQuantityPerPage: ISelectVariant;
    setUserQuantityPerPage: (value: ISelectVariant) => void;
    usersQuantityPerPageVariants: ISelectVariant[];
    currentPage: number;
    setCurrentPage: (value: number) => void;
    totalPages: number;
    onThClick: (
        sortField: AdminUserSortingFields,
        sortOrder: SortOrder,
    ) => void;
}
