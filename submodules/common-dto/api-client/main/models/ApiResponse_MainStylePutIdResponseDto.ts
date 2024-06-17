/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ApiResponse_MainStylePutIdResponseDto = {
    /**
     * Indicates whether the request was successful
     */
    success: boolean;
    data: {
        /**
         * Id of style
         */
        id: number;
        /**
         * Slug
         */
        slug: string;
        /**
         * Localized title of style
         */
        title: string;
        /**
         * ID of image
         */
        image_id: string | null;
    };
};

