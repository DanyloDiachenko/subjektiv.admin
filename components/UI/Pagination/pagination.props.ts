export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    elementId?: string;
}
