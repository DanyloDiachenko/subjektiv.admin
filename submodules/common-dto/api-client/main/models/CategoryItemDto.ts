/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CategoryItemDto = {
    /**
     * Id of category
     */
    id: number;
    /**
     * Slug
     */
    slug: string;
    /**
     * Localized title of category
     */
    title: string;
    /**
     * Localized description of category
     */
    description: string;
    /**
     * ID of image
     */
    image_id: string | null;
    /**
     * Count of artworks in category
     */
    artworks_count: number;
    /**
     * Is category voluminous
     */
    is_voluminous: boolean;
    /**
     * Order number. [ACCESS: Required access functions: main.category:view]
     */
    order_number: number | null;
    /**
     * ID of image
     */
    parent_id: number | null;
};

