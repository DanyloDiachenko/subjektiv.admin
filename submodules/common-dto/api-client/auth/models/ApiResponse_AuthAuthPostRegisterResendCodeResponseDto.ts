/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ApiResponse_AuthAuthPostRegisterResendCodeResponseDto = {
    /**
     * Indicates whether the request was successful
     */
    success: boolean;
    data: {
        /**
         * EMAIL or SMS
         */
        deliveryMedium: string;
        /**
         * Destination phone or email
         */
        destination: string;
    };
};

