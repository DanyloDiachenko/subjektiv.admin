/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ApiResponse_MainSubjectPostResponseDto = {
    /**
     * Indicates whether the request was successful
     */
    success: boolean;
    data: {
        /**
         * Id of subject
         */
        id: number;
        /**
         * Slug
         */
        slug: string;
        /**
         * Localized title of subject
         */
        title: string;
        /**
         * ID of image
         */
        image_id: string | null;
    };
};

