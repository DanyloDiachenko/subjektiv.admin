/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ApiResponse_MainKeywordsPostResponseDto = {
    /**
     * Indicates whether the request was successful
     */
    success: boolean;
    data: {
        /**
         * Id of keyword
         */
        id: number;
        /**
         * Localized title of keyword
         */
        title: string;
        /**
         * ID of image
         */
        image_id: string | null;
    };
};

