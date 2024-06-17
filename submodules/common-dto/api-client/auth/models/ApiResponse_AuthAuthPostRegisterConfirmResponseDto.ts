/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ApiResponse_AuthAuthPostRegisterConfirmResponseDto = {
    /**
     * Indicates whether the request was successful
     */
    success: boolean;
    data: {
        /**
         * Optional refresh token of the User, if remember_me is true
         */
        refreshToken?: string;
        /**
         * JWT Id token of the User
         */
        idToken: string;
        /**
         * Groups of the User
         */
        groups: Array<string>;
    };
};

