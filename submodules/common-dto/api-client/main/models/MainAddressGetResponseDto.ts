/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressDto } from './AddressDto';
export type MainAddressGetResponseDto = {
    /**
     * Current page
     */
    current_page: number;
    /**
     * Total number of items
     */
    total: number;
    /**
     * Total count of pages
     */
    total_pages: number;
    /**
     * Page size
     */
    size: number;
    /**
     * Array of items
     */
    items: Array<AddressDto>;
};

