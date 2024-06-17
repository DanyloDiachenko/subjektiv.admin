/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ApiResponse_MainCitiesPostResponseDto = {
    /**
     * Indicates whether the request was successful
     */
    success: boolean;
    data: {
        /**
         * Id of city
         */
        id: number;
        /**
         * Localized title of city
         */
        title: string;
        /**
         * Localized title of country
         */
        country: string;
    };
};

