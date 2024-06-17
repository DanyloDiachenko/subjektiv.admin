/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeliveryDto } from './DeliveryDto';
export type ApiResponse_MainDeliveryCalculatePostResponseDto = {
    /**
     * Indicates whether the request was successful
     */
    success: boolean;
    data: {
        /**
         * Array of items
         */
        items: Array<DeliveryDto>;
    };
};

