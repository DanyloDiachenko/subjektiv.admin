/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ApiResponse_AuthAuthPostRefreshTokenResponseDto = {
    /**
     * Indicates whether the request was successful
     */
    success: boolean;
    data: {
        /**
         * JWT Id token of the User
         */
        idToken: string;
    };
};

