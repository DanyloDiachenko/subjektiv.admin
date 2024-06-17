/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MainCategoriesPutIdRequestDto = {
    /**
     * Slug
     */
    slug?: string;
    /**
     * Localized title of category
     */
    title?: string;
    /**
     * Localized description of category
     */
    description?: string;
    /**
     * Set or unset ID of image
     */
    image_id?: string | null;
    /**
     * Set or unset parent category
     */
    parent_id?: number | null;
    /**
     * Order number
     */
    order_number?: number;
};

