/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MainCategoriesPostRequestDto = {
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
    image_id?: string | null;
    /**
     * Parent category
     */
    parent_id?: number | null;
};

