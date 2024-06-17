/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryItemDto } from './CategoryItemDto';
export type MainCategoriesGetResponseDto = {
    /**
     * Page number. Pass -1 to get all records.
     */
    page?: number;
    /**
     * Array of items
     */
    items: Array<CategoryItemDto>;
};

